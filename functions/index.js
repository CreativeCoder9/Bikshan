export const shareSpeechWithEmail = functions.firestore
  .document("/Contact_request")
  .onCreate(async (snapshot, context) => {
    // const userId = context.params.userId;
    const data = snapshot.data();
    const mailTransport = nodemailer.createTransport(
      `smtps://${process.env.USER_EMAIL}:${process.env.USER_PASSWORD}@smtp.gmail.com`
    );


    const mailOptions = {
      to: "sumangh9@gmail.com",
      subject: `Message test`,
      html: `<p><b>` + data.FirstName + data.LastName + `</b></p>`
    };
    try {
      return mailTransport.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  });
  