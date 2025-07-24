import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  full_name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  emergency_contact: string;
  medical_conditions?: string;
  selected_date: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registrationData: ConfirmationEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Kanwariya Yatra <onboarding@resend.dev>",
      to: [registrationData.email],
      subject: "Kanwariya Yatra Registration Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #ff6b35; text-align: center; margin-bottom: 30px;">🚩 Kanwariya Yatra Registration Confirmed</h1>
            
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Namaste <strong>${registrationData.full_name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Your registration for the Kanwariya Yatra has been successfully confirmed! 🙏
            </p>
            
            <div style="background-color: #fff4e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
              <h2 style="color: #ff6b35; margin-top: 0;">Registration Details:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.full_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Age:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.age} years</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Gender:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.gender}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Address:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.address}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Emergency Contact:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.emergency_contact}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Yatra Date:</td>
                  <td style="padding: 8px 0; color: #ff6b35; font-weight: bold;">${registrationData.selected_date}</td>
                </tr>
                ${registrationData.medical_conditions ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Medical Conditions:</td>
                  <td style="padding: 8px 0; color: #333;">${registrationData.medical_conditions}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a2d; margin-top: 0;">Important Instructions:</h3>
              <ul style="color: #2d5a2d; margin: 0; padding-left: 20px;">
                <li>Please arrive at the designated meeting point 30 minutes before the scheduled time</li>
                <li>Carry your ID proof and this confirmation email</li>
                <li>Bring comfortable walking shoes and appropriate clothing</li>
                <li>Stay hydrated and follow all safety instructions</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; color: #333; text-align: center; margin-top: 30px;">
              Har Har Mahadev! 🔱<br>
              <em>May Lord Shiva bless your journey!</em>
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 14px;">
                For any queries, please contact us at support@kanwariyayatra.com
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);