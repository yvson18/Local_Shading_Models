const fragmentShader =  `
// 'uniform' contendo informação sobre a fonte de luz ambiente.
    
uniform vec3 Ia;
    
// 'uniforms' contendo informações sobre a fonte de luz pontual.

uniform vec3 Ip_position;
uniform vec3 Ip_diffuse_color;

// 'uniforms' contendo informações sobre as reflectâncias do objeto.

uniform vec3 k_a;
uniform vec3 k_d;
uniform vec3 k_s;

// 'I' : valor de cor originalmente calculada pelo Vertex Shader, e já interpolada para o fragmento corrente.
    
varying vec4 I;
varying vec3 Normals_fragments;
varying vec4 P_fragments; // coordenada de cada fragmento
varying vec4 Ip_pos_cam_fragments; // vai ser usado para encontrar cada L que incide no fragmento

// Programa principal do Fragment Shader.

void main() {
    
    // normalizando os  N vetores normais interpolados de cada fragmento
    vec3 normal_corect = normalize(Normals_fragments);// normaliza os vetores advindos do vertex shaders interpolados
    
    // calculando os L que incidem em cada fragmento 
    vec3 L_cam_spc_fragments = normalize(Ip_pos_cam_fragments.xyz - P_fragments.xyz);
    
    // calculando os R refletidos em cada fragmento;
    vec3 R_cam_spc_fragments = reflect(L_cam_spc_fragments, normal_corect);

    // calculando os V vistos pelo usuario
    vec3 vision = -normalize(vec3(P_fragments.xyz)); // adotando a câmera como referencial

    // Termo Ambiente
    vec4 tA = vec4(Ia,1) * vec4(k_a,1);

    // Termo Difuso
    vec4 tD = (vec4(Ip_diffuse_color,1) * vec4(k_d,1)) * max(0.0,dot(normal_corect,L_cam_spc_fragments));
    // 'gl_FragColor' : variável de sistema que conterá a cor final do fragmento calculada pelo Fragment Shader.
    
    // Termo Especular
    float expoente_n = 16.0;
    vec4 tE = (vec4(Ip_diffuse_color,1) * vec4(k_s,1)) * pow(max(0.0,dot(R_cam_spc_fragments,vision)), expoente_n);
    
    gl_FragColor = tA + tD + tE;
}

`
export default fragmentShader;
