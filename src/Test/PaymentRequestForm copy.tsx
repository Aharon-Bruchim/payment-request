import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { StyledPaymentPreview } from "../components/PaymentRequests/StyledPaymentPreview";
import html2pdf from "html2pdf.js";
import emailjs from "@emailjs/browser";

interface Props {
  prefillClientName?: string;
  prefillClientEmail?: string;
}

export const PaymentRequestForm: React.FC<Props> = ({
  prefillClientName = "",
  prefillClientEmail = "",
}) => {
  const [formData, setFormData] = useState<any | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const defaultDate = `${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}.${now.getFullYear()}`;

  const bankDetails = {
    bank: "הפועלים (12)",
    branch: "698",
    account: "66806",
  };

  const generateFullData = (form: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(form).entries());
    return {
      ...data,
      ...bankDetails,
      date: data.date || defaultDate,
    };
  };

  const downloadPdf = async () => {
    if (previewRef.current && formData) {
      html2pdf()
        .from(previewRef.current)
        .set({
          margin: 0,
          format: "auto",
          unit: "mm",
          orientation: "portrait",
          filename: `בקשת תשלום ${formData.clientName} ${formData.date}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  const sendEmail = async () => {
    if (!previewRef.current || !formData) return;

    const blob = await html2pdf()
      .from(previewRef.current)
      .set({
        margin: 1,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .outputPdf("blob");

    const formDataEmail = new FormData();
    formDataEmail.append(
      "file",
      blob,
      `בקשת תשלום ${formData.clientName} ${formData.date}.pdf`
    );
    formDataEmail.append("client_name", formData.clientName);
    formDataEmail.append("message", "מצורפת בקשת תשלום");

    try {
      await emailjs.send(
        "service_3rfaadk",
        "template_ay60kcb",
        {
          client_name: formData.clientName,
          amount: formData.amount,
          date: formData.date,
          studentCount: formData.studentCount,
          sessionCount: formData.sessionCount,
          comments: formData.comments,
          bank: formData.bank,
          branch: formData.branch,
          account: formData.account,
          clientEmail: formData.clientEmail,
          message: "מצורפת בקשת תשלום",
        },
        "kshQYfqBFW6hnjIIA"
      );

      alert("המייל נשלח בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
      alert("אירעה שגיאה בשליחת המייל.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fullData = generateFullData(form);
    setFormData(fullData);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="סכום"
          name="amount"
          required
          margin="normal"
        />

        <Box my={2}>
          <Typography variant="subtitle2" fontWeight="bold">
            פרטי בנק:
          </Typography>
          <Typography>🏦 בנק: {bankDetails.bank}</Typography>
          <Typography>🏢 סניף: {bankDetails.branch}</Typography>
          <Typography>📄 חשבון: {bankDetails.account}</Typography>
        </Box>

        <input type="hidden" name="bank" value={bankDetails.bank} />
        <input type="hidden" name="branch" value={bankDetails.branch} />
        <input type="hidden" name="account" value={bankDetails.account} />

        <TextField
          fullWidth
          label="תאריך תשלום"
          name="date"
          defaultValue={defaultDate}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="מספר תלמידים"
          name="studentCount"
          type="number"
          margin="normal"
        />
        <TextField
          fullWidth
          label="מספר שיעורים"
          name="sessionCount"
          type="number"
          margin="normal"
        />
        <TextField
          fullWidth
          label="הערות"
          name="comments"
          multiline
          rows={2}
          margin="normal"
        />
        <TextField
          fullWidth
          label="שם הלקוח"
          name="clientName"
          required
          margin="normal"
          defaultValue={prefillClientName}
          slotProps={{
            input: {
              readOnly: true,
              style: {
                backgroundColor: "#f5f5f5",
                color: "#888",
                cursor: "not-allowed",
              },
            },
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          fullWidth
          label="אימייל הלקוח"
          name="clientEmail"
          defaultValue={prefillClientEmail}
          margin="normal"
          slotProps={{
            input: {
              readOnly: true,
              style: {
                backgroundColor: "#f5f5f5",
                color: "#888",
                cursor: "not-allowed",
              },
            },
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Stack direction="row" spacing={2} mt={2}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            הכנת בקשה
          </Button>
          <Button
            fullWidth
            onClick={downloadPdf}
            disabled={!formData}
            variant="outlined"
            color="secondary"
          >
            הורד PDF
          </Button>
          <Button
            fullWidth
            onClick={sendEmail}
            disabled={!formData}
            variant="outlined"
            color="success"
          >
            שלח במייל
          </Button>
        </Stack>
      </form>

      {formData && (
        <div style={{ display: "none" }}>
          <StyledPaymentPreview ref={previewRef} data={formData} />
        </div>
      )}
    </Container>
  );
};
