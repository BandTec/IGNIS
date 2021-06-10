var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");



router.post('/:1', function (req, res, next) {

    const email= req.body.ipt_Email
    const assunto= req.body.ipt_Assunto
    const nome= req.body.ipt_Nome
    const texto = req.body.ipt_mensagem
    // const anexo = req.body.ipt_anexo
    
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
        to: process.env.EMAIL_USER,
        subject: nome + ' - ' + assunto,
        text: categoria + '\n\n' + texto + '\n\n' + email,
        // attachments: [
        //     {   // file on disk as an attachment
        //         filename: 'text3.txt',
        //         path: '/path/to/file.txt' // stream this file
        //     },
        //   ]
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