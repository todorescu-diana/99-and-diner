import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Promotion } from "../../models/Promotion";
import { themeColors } from "../../theme/theme";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ManagerPromotionContainer({
  itemId,
  itemName,
  itemNormalPrice,
  itemSpecialPrice,
  products,
  setProducts,
}: {
  itemId: number;
  itemName: string;
  itemNormalPrice: number;
  itemSpecialPrice: number;
  products: Promotion[];
  setProducts: React.Dispatch<React.SetStateAction<Promotion[]>>;
}) {
  const [isEditNameActive, setIsEditNameActive] = useState(false);
  const [isEditNormalPriceActive, setIsEditNormalPriceActive] = useState(false);
  const [isEditSpecialPriceActive, setIsEditSpecialPriceActive] =
    useState(false);

  const [name, setName] = useState(itemName);
  const [normalPrice, setNormalPrice] = useState(itemNormalPrice);
  const [specialPrice, setSpecialPrice] = useState(itemSpecialPrice);

  const [initialItemInfo, setInitialItemInfo] = useState({
    name: itemName,
    normalPrice: itemNormalPrice,
    specialPrice: itemSpecialPrice,
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

  const [changeCancelled, setChangeCancelled] = useState(false);

  const [open, setOpen] = useState(false);
  const [deletedWithSuccess, setDeletedWithSuccess] = useState(false);
  const [deletedModalOpen, setDeletedModalOpen] = useState(false);

  useEffect(() => {
    if (
      name !== initialItemInfo.name ||
      normalPrice !== initialItemInfo.normalPrice ||
      specialPrice !== initialItemInfo.specialPrice
    ) {
      if (!hasItemChanged) setHasItemChanged(true);
    } else if (
      name === itemName &&
      normalPrice === itemNormalPrice &&
      specialPrice === itemSpecialPrice
    ) {
      if (hasItemChanged) setHasItemChanged(false);
    }
  }, [name, normalPrice, specialPrice]);

  const handleItemNameTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleNormalPriceTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setNormalPrice(parseInt(event.target.value));
  };

  const handleSpecialPriceTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setSpecialPrice(parseInt(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "" || isNaN(normalPrice) || isNaN(specialPrice)) {
      setChangeCancelled(true);
      setHasItemChanged(false);
      setIsEditNameActive(false);
      setIsEditNormalPriceActive(false);
      setIsEditSpecialPriceActive(false);
      if (name === "") setName(itemName); // TODO
      if (isNaN(normalPrice)) setNormalPrice(itemNormalPrice);
      if (isNaN(specialPrice)) setSpecialPrice(itemSpecialPrice);
      console.log("aici2: " + normalPrice);
      console.log("aici2: " + specialPrice);
    } else {
      const newPromotionInfo = {
        promotionId: itemId,
        promotionNewName: name,
        promotionNewPriceNormal: normalPrice,
        promotionNewPriceSpecial: specialPrice,
      };

      console.log("aici: " + normalPrice);
      console.log("aici: " + specialPrice);
      console.log(newPromotionInfo);

      try {
        const result = await axios.put(
          `http://localhost:3005/api/updateProduct/:${itemId}`,
          newPromotionInfo
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
        if (isEditNormalPriceActive)
          setIsEditNormalPriceActive(!isEditNormalPriceActive);
        if (isEditSpecialPriceActive)
          setIsEditSpecialPriceActive(!isEditSpecialPriceActive);
      }
    }
  };

  useEffect(() => {
    if (hasServerRequestProccessedWithSuccess) {
      setInitialItemInfo({
        name,
        normalPrice,
        specialPrice,
      });
    }
  }, [hasServerRequestProccessedWithSuccess]);

  useEffect(() => {
    console.log(normalPrice);
  }, [normalPrice]);

  function handleToDeletePress() {
    setOpen(true);
  }

  async function handleDeletePress() {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3005/api/delete/${itemId}`,
        {}
      );
      setOpen(false);
      setDeletedModalOpen(true);
      if (!deleteResponse.data.error) {
        setDeletedWithSuccess(true);
      }
    } catch (err) {
      if (deletedWithSuccess) setDeletedWithSuccess(false);
      console.log(err);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: themeColors.secondary,
            border: "2px solid #000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sunteţi sigur că doriţi să stergeţi această promoţie?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Această acţiune nu poate fi revocată.
          </Typography>
          <Box
            mt={2}
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mr: 2, color: themeColors.secondary }}
            >
              Renunţare
            </Button>
            <Button
              onClick={() => handleDeletePress()}
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
            >
              Ștergere promoţie
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={deletedModalOpen}
        onClose={() => {
          setProducts(
            products.filter((product) => product.promotion_id !== itemId)
          );
          setDeletedModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: themeColors.secondary,
            border: "2px solid #000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {deletedWithSuccess
              ? "Promoţie ștearsă cu succes."
              : "A apărut o eroare la ștergerea promoţiei, încercaţi mai târziu."}
          </Typography>
          <Box
            mt={2}
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                console.log(
                  products.filter((product) => product.promotion_id !== itemId)
                );
                setDeletedModalOpen(false);
                setProducts(
                  products.filter((product) => product.promotion_id !== itemId)
                );
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
            >
              Închidere
            </Button>
          </Box>
        </Box>
      </Modal>

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
                width: "70%",
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
                  onClick={() => setIsEditNormalPriceActive(true)}
                  disabled={isEditNormalPriceActive}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  sx={{ mr: 4 }}
                  onClick={() => setIsEditNormalPriceActive(false)}
                  disabled={!isEditNormalPriceActive}
                >
                  <DoneOutlineIcon fontSize="inherit" />
                </IconButton>
                <Typography
                  sx={{ width: "20%", fontWeight: "bold" }}
                  variant="h6"
                >
                  Preţ vechi:{" "}
                </Typography>
                {isEditNormalPriceActive ? (
                  <TextField
                    margin="normal"
                    id="itemPrice"
                    label="Pret"
                    name="itemPrice"
                    autoComplete="itemPrice"
                    autoFocus
                    sx={{ backgroundColor: "#fefcf6", width: "70%" }}
                    size="small"
                    onChange={handleNormalPriceTextChange}
                    defaultValue={normalPrice}
                  />
                ) : (
                  <Typography sx={{ width: "70%" }} variant="h6">
                    {normalPrice.toString()} lei
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
                  onClick={() => setIsEditSpecialPriceActive(true)}
                  disabled={isEditSpecialPriceActive}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  sx={{ mr: 4 }}
                  onClick={() => setIsEditSpecialPriceActive(false)}
                  disabled={!isEditSpecialPriceActive}
                >
                  <DoneOutlineIcon fontSize="inherit" />
                </IconButton>
                <Typography
                  sx={{ width: "20%", fontWeight: "bold" }}
                  variant="h6"
                >
                  Preţ promoţie:{" "}
                </Typography>
                {isEditSpecialPriceActive ? (
                  <TextField
                    margin="normal"
                    id="itemPrice"
                    label="Pret"
                    name="itemPrice"
                    autoComplete="itemPrice"
                    autoFocus
                    sx={{ backgroundColor: "#fefcf6", width: "70%" }}
                    size="small"
                    onChange={handleSpecialPriceTextChange}
                    defaultValue={specialPrice}
                  />
                ) : (
                  <Typography sx={{ width: "70%" }} variant="h6">
                    {specialPrice.toString()} lei
                  </Typography>
                )}
              </Box>
            </Box>
            <IconButton
              aria-label="delete"
              onClick={handleToDeletePress}
              sx={{ ml: 3, mt: 2.5 }}
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
                  Salvare informaţii promoţie
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
                    Modificare anulată.
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
                  ? "Eroare în comunicarea cu serverul."
                  : "Promoţie modificată cu succes."}
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Card>
    </>
  );
}
