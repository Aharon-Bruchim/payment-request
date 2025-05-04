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
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color="primary"
          textAlign="center"
        >
          בקשת תשלום
        </Typography>
        <Stack spacing={1} dir="rtl">
          <Typography>💰 סכום לתשלום: {data.amount} ₪</Typography>
          <Typography>🏦 בנק: {data.bank}</Typography>
          <Typography>🏢 סניף: {data.branch}</Typography>
          <Typography>📄 מספר חשבון: {data.account}</Typography>
          <Typography>📆 תאריך: {data.date || "לא הוזן"}</Typography>
          <Typography>👨‍🎓 מספר תלמידים: {data.studentCount}</Typography>
          <Typography>📚 מספר שיעורים: {data.sessionCount}</Typography>
          <Typography>📝 הערות: {data.comments}</Typography>
          <Typography>🙍‍♂️ שם הלקוח: {data.clientName}</Typography>
        </Stack>
      </Paper>
    </Box>
  )
);
