import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { themeColors } from "../../theme/theme";
import CloseIcon from "@mui/icons-material/Close";

export default function ManagerAddItemContainer() {
  const [imageUrl, setImageUrl] = useState("");

  const [
    hasServerRequestProccessedWithError,
    setHasServerRequestProccessedWithError,
  ] = useState(false);
  const [
    hasServerRequestProccessedWithSuccess,
    setHasServerRequestProccessedWithSuccess,
  ] = useState(false);

  const [type, setType] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const [emptyNameFieldErrorActive, setEmptyNameFieldErrorActive] =
    useState(false);
  const [emptyPriceFieldErrorActive, setEmptyPriceFieldErrorActive] =
    useState(false);
  const [emptyTypeFieldErrorActive, setEmptyTypeFieldErrorActive] =
    useState(false);
  const [emptyUrlFieldErrorActive, setEmptyUrlFieldErrorActive] =
    useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("itemName") === "") {
      setEmptyNameFieldErrorActive(true);
    }

    if (formData.get("itemPrice") === "") {
      setEmptyPriceFieldErrorActive(true);
    }

    if (formData.get("itemType") === "") {
      setEmptyTypeFieldErrorActive(true);
    }

    if (formData.get("itemUrl") === "") {
      setEmptyUrlFieldErrorActive(true);
    } else {
      const res = await axios.get("http://localhost:3003/api/get");
      const { data } = await res;
      let lastProductId = 0;
      if (data.length > 0) lastProductId = data[data.length - 1].product_id;

      const newProduct = {
        productId: lastProductId + 1,
        productName: formData.get("itemName"),
        productPrice: formData.get("itemPrice"),
        productType: formData.get("itemType") === "Mancare" ? "food" : "drink", // TODO daca nu se alege nimic
        productImageUrl: formData.get("itemUrl"),
      };

      try {
        const postResponseData = await axios.post(
          "http://localhost:3003/api/create",
          newProduct
        );
        if (!postResponseData.data.error) {
          if (emptyNameFieldErrorActive) {
            setEmptyNameFieldErrorActive(false);
          }
          if (emptyPriceFieldErrorActive) {
            setEmptyPriceFieldErrorActive(false);
          }
          if (emptyTypeFieldErrorActive) {
            setEmptyTypeFieldErrorActive(false);
          }
          if (emptyUrlFieldErrorActive) {
            setEmptyUrlFieldErrorActive(false);
          }
          if (hasServerRequestProccessedWithError)
            setHasServerRequestProccessedWithError(false);
          setHasServerRequestProccessedWithSuccess(true);

          if (nameInputRef.current) nameInputRef.current.value = "";
          if (priceInputRef.current) priceInputRef.current.value = "";
          setType("");
          if (urlInputRef.current) urlInputRef.current.value = "";
          setImageUrl("");
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
          <TextField
            error={emptyTypeFieldErrorActive}
            select
            label="Tip Produs"
            id="itemType"
            name="itemType"
            fullWidth
            sx={{ backgroundColor: "#fefcf6", mt: 2, borderRadius: 2 }}
            value={type}
            onChange={(t) => setType(t.target.value)}
          >
            <MenuItem key={1} value="Mancare">
              Mancare
            </MenuItem>
            <MenuItem key={2} value="Bautura">
              Bautura
            </MenuItem>
          </TextField>
          <TextField
            error={emptyUrlFieldErrorActive}
            margin="normal"
            fullWidth
            id="itemUrl"
            label="Url Imagine"
            name="itemUrl"
            sx={{ backgroundColor: "#fefcf6", mt: 3, borderRadius: 2 }}
            onChange={(e) => setImageUrl(e.target.value)}
            inputRef={urlInputRef}
          />
          <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
              type="submit"
            >
              Adaugare produs
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
                  ? "Eroare in comunicarea cu serverul."
                  : "Produs adaugat cu succes."}
              </Alert>
            </Collapse>
          </Box>
        </Box>
        <Box sx={{ width: 200, height: 130, alignSelf: "center" }}>
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: 2,
            }}
            src={imageUrl}
            alt="Invalid Image Url."
          />
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
            in={
              emptyNameFieldErrorActive ||
              emptyPriceFieldErrorActive ||
              emptyTypeFieldErrorActive ||
              emptyUrlFieldErrorActive
            }
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
                    if (emptyTypeFieldErrorActive) {
                      setEmptyTypeFieldErrorActive(false);
                    }
                    if (emptyUrlFieldErrorActive) {
                      setEmptyUrlFieldErrorActive(false);
                    }
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Toate campurile sunt obligatorii.
            </Alert>
          </Collapse>
        </Box>
      </Box>
    </Card>
  );
}
