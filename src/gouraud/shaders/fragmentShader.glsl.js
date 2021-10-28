const fragmentShader = `

// 'I' : valor de cor originalmente calculada pelo Vertex Shader, e já interpolada para o fragmento corrente.
    
varying vec4 I;

// Programa principal do Fragment Shader.

void main() {

    // 'gl_FragColor' : variável de sistema que conterá a cor final do fragmento calculada pelo Fragment Shader.
    
    gl_FragColor = I;
}

`
export default fragmentShader;