import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { themeColors } from "../../theme/theme";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ManagerItemContainer({
  itemId,
  itemName,
  itemPrice,
  itemType,
  imageUrl,
  setOpen,
}: {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: "food" | "drink";
  imageUrl: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isEditNameActive, setIsEditNameActive] = useState(false);
  const [isEditPriceActive, setIsEditPriceActive] = useState(false);
  const [isEditUrlActive, setIsEditUrlActive] = useState(false);

  const [name, setName] = useState(itemName);
  const [price, setPrice] = useState(itemPrice);
  const [url, setUrl] = useState(imageUrl);

  const [initialItemInfo, setInitialItemInfo] = useState({
    name: itemName,
    price: itemPrice,
    url: imageUrl,
  });

  const [hasItemChanged, setHasItemChanged] = useState(false);

  const [
    hasServerRequestProccessedWithError,
    setHasServerRequestProccessedWithError,
  ] = useState(false);
  const [
    hasServerRequestProccessedWithSuccess,
    setHasServerRequestProccessedWithSuccess,
  ] = useState(false);

  useEffect(() => {
    if (
      name !== initialItemInfo.name ||
      price !== initialItemInfo.price ||
      url !== initialItemInfo.url
    ) {
      if (!hasItemChanged) setHasItemChanged(true);
    } else if (name === itemName && price === itemPrice && url === imageUrl) {
      if (hasItemChanged) setHasItemChanged(false);
    }
  }, [name, price, url]);

  const handleItemNameTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handlePriceTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setPrice(parseInt(event.target.value));
  };

  const handleItemUrlTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const [changeCancelled, setChangeCancelled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "" || isNaN(price) || url === "") {
      setChangeCancelled(true);
      setHasItemChanged(false);
      setIsEditNameActive(false);
      setIsEditPriceActive(false);
      setIsEditUrlActive(false);
      if (name === "") setName(itemName); // TODO
      if (isNaN(price)) setPrice(itemPrice);
      if (url === "") setUrl(imageUrl);
    } else {
      const newProductInfo = {
        productId: itemId,
        productNewName: name,
        productNewPrice: price,
        productNewImageUrl: url,
      };

      try {
        const result = await axios.put(
          `http://localhost:3003/api/updateProduct/:${itemId}`,
          newProductInfo
        );

        if (!result.data.error) {
          if (hasServerRequestProccessedWithError)
            setHasServerRequestProccessedWithError(false);
          setHasServerRequestProccessedWithSuccess(true);
        } else {
          if (hasServerRequestProccessedWithSuccess)
            setHasServerRequestProccessedWithSuccess(false);
          setHasServerRequestProccessedWithError(true);
        }
      } catch (err) {
        if (hasServerRequestProccessedWithSuccess)
          setHasServerRequestProccessedWithSuccess(false);
        setHasServerRequestProccessedWithError(true);
      } finally {
        setHasItemChanged(false);
        if (isEditNameActive) setIsEditNameActive(!isEditNameActive);
        if (isEditPriceActive) setIsEditPriceActive(!isEditPriceActive);
        if (isEditUrlActive) setIsEditUrlActive(!isEditUrlActive);
      }
    }
  };

  useEffect(() => {
    if (hasServerRequestProccessedWithSuccess) {
      setInitialItemInfo({
        name,
        price,
        url,
      });
    }
  }, [hasServerRequestProccessedWithSuccess]);

  function handleDeletePress() {
    setOpen(true);
  }

  return (
    <Card
      sx={{
        backgroundColor: themeColors.secondary,
        display: "flex",
        flexDirection: "column",
        padding: 4,
        paddinBottom: 0,
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              mr: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{}}
                onClick={() => setIsEditNameActive(true)}
                disabled={isEditNameActive}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={{ mr: 4 }}
                onClick={() => setIsEditNameActive(false)}
                disabled={!isEditNameActive}
              >
                <DoneOutlineIcon fontSize="inherit" />
              </IconButton>
              <Typography
                sx={{ width: "20%", fontWeight: "bold" }}
                variant="h5"
              >
                Nume:{" "}
              </Typography>
              {isEditNameActive ? (
                <TextField
                  margin="normal"
                  id="itemName"
                  label="Nume"
                  name="itemName"
                  autoComplete="itemName"
                  autoFocus
                  sx={{ backgroundColor: "#fefcf6", width: "70%" }}
                  onChange={handleItemNameTextChange}
                  size="small"
                  defaultValue={name}
                />
              ) : (
                <Typography sx={{ width: "70%" }} variant="h5">
                  {name}
                </Typography>
              )}{" "}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                mt: 2,
              }}
            >
              <IconButton
                sx={{}}
                onClick={() => setIsEditPriceActive(true)}
                disabled={isEditPriceActive}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={{ mr: 4 }}
                onClick={() => setIsEditPriceActive(false)}
                disabled={!isEditPriceActive}
              >
                <DoneOutlineIcon fontSize="inherit" />
              </IconButton>
              <Typography
                sx={{ width: "20%", fontWeight: "bold" }}
                variant="h6"
              >
                Pret:{" "}
              </Typography>
              {isEditPriceActive ? (
                <TextField
                  margin="normal"
                  id="itemPrice"
                  label="Pret"
                  name="itemPrice"
                  autoComplete="itemPrice"
                  autoFocus
                  sx={{ backgroundColor: "#fefcf6", width: "70%" }}
                  size="small"
                  onChange={handlePriceTextChange}
                  defaultValue={price}
                />
              ) : (
                <Typography sx={{ width: "70%" }} variant="h6">
                  {price.toString()} lei
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                mt: 2,
              }}
            >
              <IconButton
                sx={{}}
                onClick={() => setIsEditUrlActive(true)}
                disabled={isEditUrlActive}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={{ mr: 4 }}
                onClick={() => setIsEditUrlActive(false)}
                disabled={!isEditUrlActive}
              >
                <DoneOutlineIcon fontSize="inherit" />
              </IconButton>
              <Typography
                sx={{ width: "20%", fontWeight: "bold" }}
                variant="h6"
              >
                Url imagine:{" "}
              </Typography>
              {isEditUrlActive ? (
                <TextField
                  margin="normal"
                  id="itemUrl"
                  label="Url Imagine"
                  name="itemUrl"
                  autoFocus
                  defaultValue={url}
                  sx={{
                    backgroundColor: "#fefcf6",
                    width: "70%",
                  }}
                  multiline
                  rows={3}
                  onChange={handleItemUrlTextChange}
                  size="small"
                />
              ) : (
                <Typography
                  sx={{ width: "70%", wordWrap: "break-word" }}
                  variant="h6"
                >
                  {imageUrl}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: 200,
              height: 130,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%", borderRadius: 2 }}
              src={imageUrl}
              alt="URL imagine invalid"
            />
          </Box>
          <IconButton
            aria-label="delete"
            onClick={handleDeletePress}
            sx={{ ml: 10, mr: 3, mt: 2.5 }}
          >
            <DeleteIcon color={"primary"} />
          </IconButton>
        </Box>

        {hasItemChanged ? (
          <>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, color: themeColors.secondary }}
                type="submit"
              >
                Salvare informatii produs
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Collapse in={changeCancelled}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setChangeCancelled(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Modificare anulata.
                </Alert>
              </Collapse>
            </Box>
          </>
        ) : null}
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
                : "Produs modificat cu succes."}
            </Alert>
          </Collapse>
        </Box>
      </Box>
    </Card>
  );
}
