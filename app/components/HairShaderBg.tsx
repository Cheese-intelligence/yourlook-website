"use client";

import { useEffect, useRef } from "react";

const VS_SOURCE = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FS_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_fadeY;

void main() {
    // Coordinate system with top-left as (0, 0)
    vec2 pos = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
    vec2 screenUv = pos / u_resolution;

    // Dynamic width & height aspect-ratio correction (centered, 1:1 isotropic scale)
    float aspect = u_resolution.x / u_resolution.y;
    vec2 uv = screenUv;
    if (aspect > 1.0) {
        // Landscape / PC: keep vertical scale, center horizontally
        uv.x = (screenUv.x - 0.5) * aspect + 0.5;
    } else {
        // Portrait / Mobile: keep horizontal scale, center vertically
        uv.y = (screenUv.y - 0.5) / aspect + 0.5;
    }

    // Full-screen diagonal grain coordinates
    float flow = uv.x * 0.76 - uv.y * 0.64;
    float cross = uv.x * 0.64 + uv.y * 0.76;

    // Serpentine traveling wave propagation (counter-balanced waves prevent monotonous diagonal drift)
    float t = u_time * 0.45;
    float slither1 = sin(cross * 4.2 - t * 0.8) * 0.075;
    float slither2 = cos(cross * 6.5 + t * 0.6 + 1.2) * 0.045;
    float crossDistort = sin(flow * 3.6 - t * 0.5) * 0.055;
    float warped = flow + slither1 + slither2 + crossDistort;

    // Organic clumping along the serpentine flow (natural hair lock grouping)
    float clump = sin(warped * 14.0) * 0.4 + cos(warped * 32.0) * 0.2;
    float irregularFlow = warped * 115.0 + clump * 18.0;

    // High-density microscopic hair fibers
    float h1 = sin(irregularFlow) * 0.5 + 0.5;
    float h2 = sin(irregularFlow * 2.1 + sin(warped * 45.0) * 8.0) * 0.5 + 0.5;
    float fibers = pow(h1, 4.0) * 0.55 + pow(h2, 6.0) * 0.45;

    // Organic wandering light beam across the full screen
    float sweep = 0.52
                + sin(u_time * 0.24) * 0.38
                + cos(u_time * 0.12 + 1.4) * 0.20
                + sin(u_time * 0.06 + 3.1) * 0.12;

    float beamDist = cross - sweep;
    float bdNorm = beamDist / 0.26;
    float beam = exp(-(bdNorm * bdNorm));

    // Specular glint along the slithering wave crests
    float glint = pow(max(fibers, 0.0), 3.5) * (beam * beam);

    // Brand Colors (pure white #FFFFFF reserved for UI text)
    vec3 silkYellow = vec3(1.0, 0.949, 0.753); // COLORS.yellow
    vec3 silkBlue = vec3(0.741, 0.808, 1.0);   // COLORS.blue
    vec3 champagneHighlight = vec3(1.0, 0.975, 0.88); // warm champagne sheen

    // Baseline dark gray hair tone (hair texture is always gently visible in the shadows)
    vec3 charcoalHair = vec3(0.18, 0.19, 0.22);
    vec3 ambientBase = charcoalHair * (fibers * 0.15);

    // Chromatic transition across the sweeping beam
    vec3 beamColor = mix(silkBlue, silkYellow, smoothstep(-0.22, 0.22, beamDist));

    // Composite: always-present dark gray hair + sweeping chromatic highlight beam
    vec3 color = ambientBase;
    color += beamColor * beam * 0.08;
    color += beamColor * (fibers * beam) * 0.38;
    color += champagneHighlight * glint * 0.24;

    // Soft text zone breathing attenuation (keeps typography 100% crisp)
    vec2 textCenter = vec2(0.5, 0.62);
    vec2 textDist = (screenUv - textCenter) * vec2(1.0, 1.35);
    float textZone = smoothstep(0.18, 0.68, length(textDist));
    color *= mix(0.42, 1.0, textZone);

    float alpha = clamp(length(color) * 0.95, 0.0, 0.48);

    // Fade at the bottom just above text into background
    float fadeStart = max(u_fadeY - 0.20, 0.05);
    float fadeEnd = u_fadeY;
    float bottomFade = 1.0 - smoothstep(fadeStart, fadeEnd, screenUv.y);

    color *= bottomFade;
    alpha *= bottomFade;

    gl_FragColor = vec4(color, alpha);
}
`;

interface HairShaderBgProps {
  fadeY?: number;
}

export function HairShaderBg({ fadeY = 0.65 }: HairShaderBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fadeYRef = useRef(fadeY);

  useEffect(() => {
    fadeYRef.current = fadeY;
  }, [fadeY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "high-performance" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const fadeYLoc = gl.getUniformLocation(program, "u_fadeY");

    let animationFrameId: number;
    const startTime = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const targetWidth = Math.floor(width * dpr);
      const targetHeight = Math.floor(height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        gl.viewport(0, 0, targetWidth, targetHeight);
      }
    }

    function render() {
      if (!canvas || !gl) return;
      resize();
      const elapsed = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      if (timeLoc) gl.uniform1f(timeLoc, elapsed);
      if (resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);
      if (fadeYLoc) gl.uniform1f(fadeYLoc, fadeYRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
