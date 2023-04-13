const mailer = require("nodemailer");

module.exports = (email, nome, pdf) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            type: 'OAuth2',
            user: 'certificados@cimatecjr.com.br',
            pass: 'Certificados@123',
            clientId: '82725483364-jci5bne2eb1dmiu0n8en28tle7j73sth.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04X45L3IRz0eJCgYIARAAGAQSNwF-L9Iri36FckDa7A6xz4XxL3yrH-ZU16kH6hObyBN2jmeyjNczmCkcnrNpZRg0ilBFtYT3tpY'
        }
    })
    
    const mail = {
        from: "Certificados <certificados@cimatecjr.com.br>",
        to: email,
        subject: `Certificado CIMATEC jr`,
        text: `Olaaa ${nome}, primeiramente gostariamos de te agradecer pelo tempo dedicado a nossa querida família CIMATEC jr, obrigado por ter feito a diferença. Segue em anexo o seu certificado de horas complementares.`,
    }
    
    if(pdf){
        console.log(pdf);
        mail.attachments = [];
        mail.attachments.push({
            filename: pdf.originalname,
            content: pdf.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}