"use client";

import { useEffect, useRef, useState } from "react";

const VS_SOURCE = `
precision highp float;
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
    vec2 safeRes = max(u_resolution, vec2(1.0, 1.0));
    vec2 screenUv = pos / safeRes;

    // Dynamic aspect-ratio handling
    float aspect = safeRes.x / safeRes.y;
    vec2 uv = screenUv;
    if (aspect > 1.0) {
        // Landscape / PC: keep vertical scale, center horizontally
        uv.x = (screenUv.x - 0.5) * aspect + 0.5;
    }

    // Diagonal hair grain coordinates
    float flow = uv.x * 0.76 - uv.y * 0.64;
    float crossCoord = uv.x * 0.64 + uv.y * 0.76;

    // Serpentine traveling wave propagation
    float t = u_time * 0.45;
    float slither1 = sin(crossCoord * 4.2 - t * 0.8) * 0.075;
    float slither2 = cos(crossCoord * 6.5 + t * 0.6 + 1.2) * 0.045;
    float crossDistort = sin(flow * 3.6 - t * 0.5) * 0.055;
    float warped = flow + slither1 + slither2 + crossDistort;

    // Organic clumping along the serpentine flow
    float clump = sin(warped * 14.0) * 0.4 + cos(warped * 32.0) * 0.2;
    float irregularFlow = warped * 115.0 + clump * 18.0;

    // Microscopic hair fibers (clamped to prevent negative float rounding on mobile)
    float h1 = clamp(sin(irregularFlow) * 0.5 + 0.5, 0.0, 1.0);
    float h2 = clamp(sin(irregularFlow * 2.1 + sin(warped * 45.0) * 8.0) * 0.5 + 0.5, 0.0, 1.0);
    float h1_2 = h1 * h1;
    float h1_4 = h1_2 * h1_2;
    float h2_2 = h2 * h2;
    float h2_6 = h2_2 * h2_2 * h2_2;
    float fibers = h1_4 * 0.55 + h2_6 * 0.45;

    // Sweeping highlight beam across the screen
    float sweep = 0.55
                + sin(u_time * 0.35) * 0.40
                + cos(u_time * 0.18 + 1.4) * 0.20;

    float beamDist = crossCoord - sweep;
    float bdNorm = beamDist / 0.28;
    float beam = exp(-clamp(bdNorm * bdNorm, 0.0, 30.0));

    // Specular glint along hair wave crests (safe epsilon avoids mobile pow(0) = NaN)
    float glint = pow(max(fibers, 0.0001), 3.5) * (beam * beam);

    // Brand Colors
    vec3 silkYellow = vec3(1.0, 0.949, 0.753);
    vec3 silkBlue = vec3(0.741, 0.808, 1.0);
    vec3 champagne = vec3(1.0, 0.975, 0.88);

    // Baseline visible hair color (noticeable rich dark tones)
    vec3 charcoalHair = vec3(0.24, 0.25, 0.28);
    vec3 ambientBase = charcoalHair * (0.20 + fibers * 0.45);

    // Chromatic transition across the sweeping beam
    vec3 beamColor = mix(silkBlue, silkYellow, clamp(beamDist * 2.5 + 0.5, 0.0, 1.0));

    // Composite hair color
    vec3 hairColor = ambientBase;
    hairColor += beamColor * beam * 0.25;
    hairColor += beamColor * (fibers * beam) * 0.70;
    hairColor += champagne * glint * 0.45;

    // Text zone soft breathing attenuation (keeps typography crisp)
    vec2 textCenter = vec2(0.5, 0.62);
    vec2 textDist = (screenUv - textCenter) * vec2(1.0, 1.35);
    float textZone = smoothstep(0.18, 0.68, length(textDist));
    hairColor *= mix(0.55, 1.0, textZone);

    // Page background color (#121212)
    vec3 bgColor = vec3(0.0706, 0.0706, 0.0706);

    // Safe bottom fade: ensures fadeEnd > fadeStart to prevent division by zero in smoothstep
    float fadeStart = max(u_fadeY - 0.25, 0.05);
    float fadeEnd = max(u_fadeY, fadeStart + 0.05);
    float bottomFade = 1.0 - smoothstep(fadeStart, fadeEnd, screenUv.y);

    // Direct opaque blend into page background (eliminates Android transparent canvas compositing bugs)
    vec3 finalColor = mix(bgColor, hairColor, bottomFade);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface HairShaderBgProps {
  fadeY?: number;
}

export function HairShaderBg({ fadeY = 0.65 }: HairShaderBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fadeYRef = useRef(fadeY);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fadeYRef.current = fadeY;
  }, [fadeY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try standard contexts; alpha: false ensures direct hardware composition on Android
    const gl =
      (canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "default" }) as WebGLRenderingContext | null) ||
      (canvas.getContext("webgl", { alpha: false, antialias: false }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl", { alpha: false, antialias: false }) as WebGLRenderingContext | null);

    if (!gl) {
      setErrorMessage("WebGL is not supported or was disabled by your browser.");
      return;
    }

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        const log = glCtx.getShaderInfoLog(shader) || "Shader compile error";
        console.error(log);
        setErrorMessage(log);
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
      const log = gl.getProgramInfoLog(program) || "Program link error";
      console.error(log);
      setErrorMessage(log);
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
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor(width * dpr);
      const targetHeight = Math.floor(height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        gl.viewport(0, 0, targetWidth, targetHeight);
      }
    }

    // Resize on mount and on window resize only (avoids layout thrashing in requestAnimationFrame)
    resize();
    window.addEventListener("resize", resize);

    function render() {
      if (!canvas || !gl) return;
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
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      {errorMessage && (
        <div className="absolute top-2 left-2 right-2 z-50 bg-red-950/90 border border-red-500 text-red-200 text-xs p-3 rounded-lg font-mono">
          WebGL Error: {errorMessage}
        </div>
      )}
    </>
  );
}
