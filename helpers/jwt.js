const jwt = require('jsonwebtoken');

class JwtService {
  constructor(secret) {
    this.secret = "esetech_jwt_sec";
  }

  async generateAt(payload, expiresIn = '1h') {
    return  jwt.sign(payload, this.secret, { expiresIn });
  }

  async generateRt(payload, expiresIn = '1w') {
    return  jwt.sign(payload, this.secret, { expiresIn });
  }


 async  verifyToken(token) {
    return  jwt.verify(token, this.secret);
  }

}

module.exports = JwtService;
