class Usuario {
  constructor(usuario, contrasena, rol = "usuario") {
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.rol = rol; // 'usuario' or 'admin'
    this.puntuacion = 0;
  }
}
