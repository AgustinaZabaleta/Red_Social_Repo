const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

userSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'Un email valido es requerido');

// genera hash
async function generateHash(pass) {
  const salt = bcrypt.genSaltSync(12);
  return await bcrypt.hash(pass, salt);
}

// hook pre para save al guardar hashear el password automaticamente
// https://github.com/Automattic/mongoose/issues/8291
userSchema.pre('save', function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});

// hook 'pre' para hashear pass al usar el metodo findOneAnd...
// https://mongoosejs.com/docs/middleware.html#notes
userSchema.pre('findOneAndUpdate', async function () {
  // if (this._update.password) {
  //   this._update.password = await generateHash(this._update.password);
  // }
  let update = { ...this.getUpdate() };
  // Only run this function if password was modified
  if (update.password) {
    // Hash the password
    update.password = await generateHash(this.getUpdate().password);
    this.setUpdate(update);
  }
});

// metodo agregado al modelo para comparar pass
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
