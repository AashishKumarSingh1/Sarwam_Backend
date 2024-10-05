import { Request, Response, NextFunction } from "express";
import { mailSender } from "../utils/mailSender";
import HomePage from "../model/home.model";
export class contactController {
  static async contact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, message } = req.body.formData;
    try {
      const message1="Thank you for Using Sarwam! We appreciate your trust in us. Rest assured, we will reach out to you soon to address your query and provide the assistance you need."
      await mailSender(email, name, message1);
      const email1="beta.com.coders@gmail.com"
      await mailSender(email1,name,message)
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  }

  static async getData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await HomePage.findOne(
        {},
        {
          totalContractorsAssociated: 1,
          totalMessAssociated: 1,
          totalNgoAssociated: 1,
          totalStudentsAssociated: 1,
        }
      );
      const response = {
        totalContractorsAssociated: data?.totalContractorsAssociated || 0,
        totalMessAssociated: data?.totalMessAssociated || 0,
        totalNgoAssociated: data?.totalNgoAssociated || 0,
        totalStudentsAssociated: data?.totalStudentsAssociated || 0,
      };
      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
