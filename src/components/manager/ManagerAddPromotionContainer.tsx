import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { themeColors } from "../../theme/theme";
import CloseIcon from "@mui/icons-material/Close";

export default function ManagerAddNewPromotionContainer() {
  const [
    hasServerRequestProccessedWithError,
    setHasServerRequestProccessedWithError,
  ] = useState(false);
  const [
    hasServerRequestProccessedWithSuccess,
    setHasServerRequestProccessedWithSuccess,
  ] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const [emptyNameFieldErrorActive, setEmptyNameFieldErrorActive] =
    useState(false);
  const [emptyPriceFieldErrorActive, setEmptyPriceFieldErrorActive] =
    useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("itemName") === "") {
      setEmptyNameFieldErrorActive(true);
    }

    if (formData.get("itemPrice") === "") {
      setEmptyPriceFieldErrorActive(true);
    } else {
      const res = await axios.get("http://localhost:3005/api/get");
      const { data } = await res;
      let lastPromotionId = 0;
      if (data.length > 0) lastPromotionId = data[data.length - 1].promotion_id;

      const newPromotion = {
        promotionId: lastPromotionId + 1,
        promotionName: formData.get("itemName"),
        promotionPrice: formData.get("itemPrice"),
      };

      try {
        const postResponseData = await axios.post(
          "http://localhost:3005/api/create",
          newPromotion
        );
        if (!postResponseData.data.error) {
          if (emptyNameFieldErrorActive) {
            setEmptyNameFieldErrorActive(false);
          }
          if (emptyPriceFieldErrorActive) {
            setEmptyPriceFieldErrorActive(false);
          }
          if (hasServerRequestProccessedWithError)
            setHasServerRequestProccessedWithError(false);
          setHasServerRequestProccessedWithSuccess(true);

          if (nameInputRef.current) nameInputRef.current.value = "";
          if (priceInputRef.current) priceInputRef.current.value = "";
        } else {
          if (hasServerRequestProccessedWithSuccess)
            setHasServerRequestProccessedWithSuccess(false);
          setHasServerRequestProccessedWithError(true);
        }
      } catch (err) {
        if (hasServerRequestProccessedWithSuccess)
          setHasServerRequestProccessedWithSuccess(false);
        setHasServerRequestProccessedWithError(true);
      }
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: themeColors.secondary,
        display: "flex",
        flexDirection: "column",
        padding: 4,
        paddingBottom: 0,
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            p: 4,
            pb: 0,
          }}
        >
          <TextField
            error={emptyNameFieldErrorActive}
            margin="normal"
            fullWidth
            id="itemName"
            label="Nume"
            name="itemName"
            autoComplete="itemName"
            autoFocus
            sx={{ backgroundColor: "#fefcf6", borderRadius: 2 }}
            inputRef={nameInputRef}
          />
          <TextField
            error={emptyPriceFieldErrorActive}
            margin="normal"
            fullWidth
            id="itemPrice"
            label="Pret"
            name="itemPrice"
            autoComplete="itemPrice"
            sx={{ backgroundColor: "#fefcf6", borderRadius: 2 }}
            inputRef={priceInputRef}
          />
          <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
              type="submit"
            >
              Adăugare promoţie
            </Button>
          </Box>
          <Box sx={{ width: "100%" }} mt={2}>
            <Collapse
              in={
                hasServerRequestProccessedWithError ||
                hasServerRequestProccessedWithSuccess
              }
            >
              <Alert
                severity={
                  hasServerRequestProccessedWithError ? "error" : "success"
                }
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      if (hasServerRequestProccessedWithError)
                        setHasServerRequestProccessedWithError(
                          !hasServerRequestProccessedWithError
                        );
                      else if (hasServerRequestProccessedWithSuccess)
                        setHasServerRequestProccessedWithSuccess(
                          !hasServerRequestProccessedWithSuccess
                        );
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {hasServerRequestProccessedWithError
                  ? "Eroare în comunicarea cu serverul."
                  : "Promoţie adăugată cu succes."}
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "85.5%" }} p={4}>
          <Collapse
            in={emptyNameFieldErrorActive || emptyPriceFieldErrorActive}
          >
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    if (emptyNameFieldErrorActive) {
                      setEmptyNameFieldErrorActive(false);
                    }
                    if (emptyPriceFieldErrorActive) {
                      setEmptyPriceFieldErrorActive(false);
                    }
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Toate câmpurile sunt obligatorii.
            </Alert>
          </Collapse>
        </Box>
      </Box>
    </Card>
  );
}
