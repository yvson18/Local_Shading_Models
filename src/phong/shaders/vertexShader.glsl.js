const vertexShader = `
// 'uniform' contendo informação sobre a fonte de luz ambiente.
    
uniform vec3 Ia;
    
// 'uniforms' contendo informações sobre a fonte de luz pontual.

uniform vec3 Ip_position;
uniform vec3 Ip_diffuse_color;

// 'uniforms' contendo informações sobre as reflectâncias do objeto.

uniform vec3 k_a;
uniform vec3 k_d;
uniform vec3 k_s;

// 'I' : Variável que armazenará a cor final (i.e. intensidade) do vértice, após a avaliação do modelo local de iluminação.
//     A variável 'I' é do tipo 'varying', ou seja, seu valor será calculado pelo Vertex Shader (por vértice)
//     e será interpolado durante a rasterização das primitivas, ficando disponível para cada fragmento gerado pela rasterização.

varying vec4 I;
varying vec3 Normals_fragments;
varying vec4 P_fragments;
varying vec4 Ip_pos_cam_fragments;

// Programa principal do Vertex Shader.

void main() {
   
//FODAC--------------------------------------------------
    // 'modelViewMatrix' : variável de sistema que contém a matriz ModelView (4x4).
    // 'Ip_pos_cam_spc' : variável que armazenará a posição da fonte de luz no Espaço da Câmera.
    
    vec4 Ip_pos_cam_spc = modelViewMatrix * vec4(Ip_position, 1.0);
    Ip_pos_cam_fragments = modelViewMatrix * vec4(Ip_position, 1.0);

    // 'position' : variável de sistema que contém a posição do vértice (vec3) no espaço do objeto.
    // 'P_cam_spc' : variável que contém o vértice (i.e. 'position') transformado para o Espaço de Câmera.
    //     Observe que 'position' é um vetor 3D que precisou ser levado para o espaço projetivo 4D 
    //     (i.e., acrescentando-se uma coordenada adicional w = 1.0) para poder ser multiplicado pela
    //     matriz 'modelViewMatrix' (que é 4x4).
    
    vec4 P_cam_spc = modelViewMatrix * vec4(position, 1.0);

// vértices no espaço de camerea que serão interpolados na passagem para o fragmentShader
    P_fragments = modelViewMatrix * vec4(position, 1.0);
    
//---------------------------------------------------------------------------------------

//FECHANDOCRIVODOFODAC-----------------------------------

// NORMALIZAÇÃO CRUCIAL------------------------------------------

    // 'normal' : variável de sistema que contém o vetor normal do vértice (vec3) no espaço do objeto.
    // 'normalMatrix' : variável de sistema que contém a matriz de normais (3x3) gerada a partir da matriz 'modelViewMatrix'.
    
    Normals_fragments = normalize(normalMatrix * normal);// vetores normais de cada vérice do objeto no espaço de câmera

// FECHANDONORMALIZAÇÃO CRUCIAL-----------------------------------

    
    // 'gl_Position' : variável de sistema que conterá a posição final do vértice transformado pelo Vertex Shader.
    
    gl_Position = projectionMatrix * P_cam_spc;
}
`
export default vertexShader;