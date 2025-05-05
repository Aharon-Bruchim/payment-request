import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { StyledPaymentPreview } from "./StyledPaymentPreview";
import html2pdf from "html2pdf.js";

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

  const generateFullData = (): any => {
    const form = document.querySelector("form") as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    return {
      ...data,
      ...bankDetails,
      date: data.date || defaultDate,
    };
  };

  const downloadPdf = async () => {
    const fullData = generateFullData();
    setFormData(fullData);

    if (previewRef.current) {
      html2pdf()
        .from(previewRef.current)
        .set({
          margin: 1,
          filename: `בקשת תשלום ${fullData.clientName} ${fullData.date}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  const openMailClient = async () => {
    const fullData = generateFullData();
    setFormData(fullData);

    if (previewRef.current) {
      await html2pdf()
        .from(previewRef.current)
        .set({
          margin: 1,
          filename: `בקשת תשלום ${fullData.clientName} ${fullData.date}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }

    const subject = `בקשת תשלום משירה `;
    const body = `
  שלום,

   בקשת תשלום עבור ${fullData.clientName} בסך ${fullData.amount} ₪.
  
  📅 תאריך: ${fullData.date}
  👨‍🏫 מספר תלמידים: ${fullData.studentCount || "-"}
  📚 מספר שיעורים: ${fullData.sessionCount || "-"}
  💬 הערות: ${fullData.comments || "-"}
  

  פרטי בנק:
  🏦 בנק: ${fullData.bank}
  🏢 סניף: ${fullData.branch}
  📄 חשבון: ${fullData.account}
  
מצורף PDF עם פרטי הבקשה.  
  תודה רבה!
    `.trim();

    const mailtoLink = `mailto:${
      fullData.clientEmail
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <Container maxWidth="sm">
      <form>
        <TextField
          fullWidth
          label="סכום"
          name="amount"
          required
          margin="normal"
          type="number"
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
        />
        <TextField
          fullWidth
          label="מספר תלמידים"
          name="studentCount"
          type="number"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="מספר שיעורים"
          name="sessionCount"
          type="number"
          margin="normal"
          required
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
          inputProps={{
            readOnly: true,
            style: {
              backgroundColor: "#f5f5f5",
              color: "#888",
              cursor: "not-allowed",
            },
          }}
        />
        <TextField
          fullWidth
          label="אימייל הלקוח"
          name="clientEmail"
          defaultValue={prefillClientEmail}
          margin="normal"
          inputProps={{
            readOnly: true,
            style: {
              backgroundColor: "#f5f5f5",
              color: "#888",
              cursor: "not-allowed",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            onClick={downloadPdf}
            variant="outlined"
            color="secondary"
            sx={{
              width: "calc(50% - 8px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            הורד PDF
          </Button>
          <Button
            onClick={openMailClient}
            variant="outlined"
            color="success"
            sx={{
              width: "calc(50% - 8px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            פתח מייל לשליחה
          </Button>
        </Box>
      </form>

      {formData && (
        <div style={{ display: "none" }}>
          <StyledPaymentPreview ref={previewRef} data={formData} />
        </div>
      )}
    </Container>
  );
};
