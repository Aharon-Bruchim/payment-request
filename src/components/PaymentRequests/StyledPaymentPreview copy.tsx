import { forwardRef } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

interface Props {
  data: any;
}

export const StyledPaymentPreview = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingY: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          p: 4,
          borderRadius: 3,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="לוגו כינורות"
          style={{ width: 120, marginBottom: 16 }}
        />
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          color="primary"
          textAlign="center"
        >
          בקשת תשלום עבור {data.clientName} תאריך: {data.date}
        </Typography>
        <Stack spacing={1} dir="rtl">
          <Typography>💰 סכום לתשלום: {data.amount} ₪</Typography>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              mt: 3,
            }}
          >
            <Typography>🧾פרטי בנק להעברה:</Typography>
            <Typography>🏦 בנק: {data.bank}</Typography>
            <Typography>🏢 סניף: {data.branch}</Typography>
            <Typography>📄 מספר חשבון: {data.account}</Typography>
          </Box>

          <Typography>📆 תאריך: {data.date || "לא הוזן"}</Typography>
          <Typography>👨‍🎓 מספר תלמידים: {data.studentCount}</Typography>
          <Typography>📚 מספר שיעורים: {data.sessionCount}</Typography>
          <Typography>📝 הערות: {data.comments}</Typography>
        </Stack>
      </Paper>
    </Box>
  )
);
