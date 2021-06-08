var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.post('/:email', function (req, res, next) {
    const email= req.params.email
    const assunto= req.body.text_assunto
    const categoria= req.body.sel_opcao
    const texto = req.body.text_descricao
    
    var remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var emailASerEnviado = {
        to: 'help@ignis-envsafe.on.spiceworks.com',
        subject: email + ' - ' + assunto,
        text: categoria + '\n\n' + texto
    };

    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado com sucesso.');
        }
    });
res.send('OK')
});

module.exports = router;