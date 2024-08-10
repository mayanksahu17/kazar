import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { Teams } from "@/model/Teams";
import { User } from "@/model/User";
import { jwtVerify } from "jose";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/Start-tournament";

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        return payload;
    } catch {
        throw new Error("Invalid Token");
    }
}

async function getUserById(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error("User not found");
    return user;
}

async function sendEmail(player: any, tournament: any, slot: number, RoomId: string, Password: string, transporter: any) {
    const emailTemplate = render(
        <VerificationEmail
            username={player.userName}
            tournament={tournament.title}
            slot={slot.toString()}
            roomId={RoomId}
            roomPass={Password}
        />
    );
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: player.email,
        subject: "Join match Now",
        html: emailTemplate,
    };
    await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        if (!token) throw new Error("Unauthorized");

        const payload = await verifyToken(token);
        const user = await getUserById(payload.id as string);

        await dbConnect();

        const tournaments = await Tournaments.find({
            _id: { $in: user.tournaments }
        }).lean();

        return NextResponse.json({
            success: true,
            message: "Tournaments found successfully",
            data: tournaments,
        }, { status: SUCCESS });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error",
        }, { status: error.message.includes("Unauthorized") ? UNAUTHORIZED : SERVER_ERROR });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { RoomId, Password, tournamentName } = await req.json();

        await dbConnect();
        const tournament = await Tournaments.findOne({ title: tournamentName }).lean();

        if (!tournament) {
            return NextResponse.json({ success: false, message: "Tournament not found" }, { status: UNAUTHORIZED });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let slot = 1;
        switch (tournament.mode) {
            case "solo":
                const soloPlayers = await User.find({ _id: { $in: tournament.registeredSoloTeams } }).lean();
                for (const player of soloPlayers) {
                    await sendEmail(player, tournament, slot++, RoomId, Password, transporter);
                }
                break;

            case "duo":
            case "squad":
                const teams = await Teams.find({ _id: { $in: tournament.registeredTeams } }).lean();
                for (const team of teams) {
                    const players = [team.player1, team.player2, team.player3, team.player4].filter(Boolean);
                    const playerEmails = await User.find({ userName: { $in: players } }).lean();
                    for (const player of playerEmails) {
                        await sendEmail(player, tournament, slot, RoomId, Password, transporter);
                    }
                    slot++;
                } 
                break;
        }

        return NextResponse.json({
            success: true,
            message: "Notifications sent successfully",
            data: tournament,
        }, { status: SUCCESS });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error",
        }, { status: SERVER_ERROR });
    }
}




























// export async function PUT(req: NextRequest) {
//     // TODO : here we have to find those users who are registered with given tournament name 
//     // and then we have to send them a notification that they are registered for the tournament
//     // and send an Email with Room id and password along with 
//     const {  RoomId , Password , touranmentName } = await req.json();

//     const tournament = await Tournaments.findOne({title : touranmentName})
    
//     if(!tournament){
//         return NextResponse.json({ message: "Tournament not found" }, { status: UNAUTHORIZED
//             });
//         }
//              // Send confirmation email to the user
//              const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 secure: true,
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS,
//                 },
//             });
    
//      switch(tournament.mode){
//         case "solo" : 
//             const arrayOfPlayerIds = tournament.registeredSoloTeams
//             const arrayOfPlayers = await User.find({ _id: { $in: arrayOfPlayerIds }})
//             let slot = 1 ;
//             arrayOfPlayers.forEach(async(player) => {
//                 // username,
//                 // roomId,
//                 // roomPass,
//                 // tournament,
//                 // slot,
//                 const emailTemplate = render(
//                     <VerificationEmail username={player.userName} tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//                 );
//                 const mailOptions = {
//                     from: process.env.EMAIL_USER,
//                     to: player.email,
//                     subject: 'Join match Now',
//                     html: emailTemplate,
//                 };
//                 await transporter.sendMail(mailOptions);
//                 slot++;
//               });
//                    break; 
//         case "duo" : 
//         const arrayOfTeamIds = tournament.registeredTeams
//             const arrayOfTeams = await Teams.find({ _id: { $in: arrayOfTeamIds }})
//               let slot1 = 1 ;
//               arrayOfTeams.forEach(async(team) => {

//                 const emailTemplate = render(
//                     <VerificationEmail username={team.player1 as string} tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//                 );
//                 const player1Email = await User.findOne({userName : team.player1})
//                 const mailOptions = {
//                     from: process.env.EMAIL_USER,
//                     to: player1Email?.email,
//                     subject: 'Join match Now',
//                     html: emailTemplate,
//                 };
//                 await transporter.sendMail(mailOptions);

//                 const emailTemplate1 = render(
//                     <VerificationEmail username={team.player2 as string } tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//                 );
//                 const player2Email = await User.findOne({userName : team.player2})
//                 const mailOptions1 = {
//                     from: process.env.EMAIL_USER,
//                     to: player2Email?.email,
//                     subject: 'Join match Now',
//                     html: emailTemplate1,
//                 };
//                 await transporter.sendMail(mailOptions1);
//                 slot++;
//               })
//                     break; 
//         case "squad" : 
//         const arrayOfSquadTeamIds = tournament.registeredTeams
//         const arrayOfSquadTeams = await Teams.find({ _id: { $in: arrayOfSquadTeamIds }})
//           let arrayOfSquadTeamsSlot1 = 1 ;
//           arrayOfSquadTeams.forEach(async(team) => {

//             const emailTemplate = render(
//                 <VerificationEmail username={team.player1 as string } tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//             );
//             const player1Email = await User.findOne({userName : team.player1})
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: player1Email?.email,
//                 subject: 'Join match Now',
//                 html: emailTemplate,
//             };
//             await transporter.sendMail(mailOptions);

//             const emailTemplate2 = render(
//                 <VerificationEmail username={team.player2 as string } tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//             );
//             const player2Email = await User.findOne({userName : team.player2})
//             const mailOptions2 = {
//                 from: process.env.EMAIL_USER,
//                 to: player2Email?.email,
//                 subject: 'Join match Now',
//                 html: emailTemplate2,
//             };
//             await transporter.sendMail(mailOptions2);

//             const emailTemplate3 = render(
//                 <VerificationEmail username={team.player3 as string } tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//             );
//             const player3Email = await User.findOne({userName : team.player3})
//             const mailOptions3 = {
//                 from: process.env.EMAIL_USER,
//                 to: player2Email?.email,
//                 subject: 'Join match Now',
//                 html: emailTemplate3,
//             };
//             await transporter.sendMail(mailOptions3);

//             const emailTemplate4 = render(
//                 <VerificationEmail username={team.player4 as string} tournament={tournament.title} slot={slot.toString()} roomId={RoomId} roomPass={Password}  />
//             );
//             const player4Email = await User.findOne({userName : team.player4})
//             const mailOptions4 = {
//                 from: process.env.EMAIL_USER,
//                 to: player4Email?.email,
//                 subject: 'Join match Now',
//                 html: emailTemplate4,
//             };
//             await transporter.sendMail(mailOptions4);
//             slot++;
//           })




//                      break;
//      }
// return NextResponse.json({
//     data : tournament,
//  })
// }

