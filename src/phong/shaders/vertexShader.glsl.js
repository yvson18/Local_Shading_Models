const vertexShader = `

// 'uniforms' contendo informações sobre a fonte de luz pontual.

uniform vec3 Ip_position;
uniform vec3 Ip_diffuse_color;

varying vec3 Normals_fragments;
varying vec4 P_fragments;
varying vec4 Ip_pos_cam_fragments;

// Programa principal do Vertex Shader.

void main() {
   
//---------------------- Cálculo do Ip_pos_cam_fragments e P_fragments ----------------------------

    // 'modelViewMatrix' : variável de sistema que contém a matriz ModelView (4x4).
    // 'Ip_pos_cam_spc' : variável que armazenará a posição da fonte de luz no Espaço da Câmera.
    //vec4 Ip_pos_cam_spc = modelViewMatrix * vec4(Ip_position, 1.0);
    
    //********* variável que armazenará a posição da fonte de luz no Espaço da Câmera e será utilizada no fragment shader.
    Ip_pos_cam_fragments = modelViewMatrix * vec4(Ip_position, 1.0);

    // 'position' : variável de sistema que contém a posição do vértice (vec3) no espaço do objeto.
    // 'P_cam_spc' : variável que contém o vértice (i.e. 'position') transformado para o Espaço de Câmera.
    //     Observe que 'position' é um vetor 3D que precisou ser levado para o espaço projetivo 4D 
    //     (i.e., acrescentando-se uma coordenada adicional w = 1.0) para poder ser multiplicado pela
    //     matriz 'modelViewMatrix' (que é 4x4).
    
    //vec4 P_cam_spc = modelViewMatrix * vec4(position, 1.0);

    //******** vértices no espaço de camera que serão interpolados na passagem para o fragmentShader
    P_fragments = modelViewMatrix * vec4(position, 1.0);
    
//-------------------------------------------------------------------------------------------------


//---------------------------------- NORMALIZAÇÃO CRUCIAL------------------------------------------

    // 'normal' : variável de sistema que contém o vetor normal do vértice (vec3) no espaço do objeto.
    // 'normalMatrix' : variável de sistema que contém a matriz de normais (3x3) gerada a partir da matriz 'modelViewMatrix'.
    
    //******** vetores normais de cada vérice do objeto no espaço de câmera que serão interpolados
    Normals_fragments = normalize(normalMatrix * normal); 

//-------------------------------------------------------------------------------------------------

    // 'gl_Position' : variável de sistema que conterá a posição final do vértice transformado pelo Vertex Shader.
    gl_Position = projectionMatrix * P_fragments;
}
`

export default vertexShader;
