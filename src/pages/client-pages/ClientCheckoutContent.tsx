import * as React from "react";
import Box from "@mui/material/Box";
import { themeColors } from "../../theme/theme";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Card,
  Collapse,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useClientOrderContext } from "../../contexts/ClientOrderContext";
import axios from "axios";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import StyledFooter from "../../components/StyledFooter";

const steps = [
  "Verificare comanda",
  "Introducere indicatii speciale comanda",
  "Introducere adresa",
];

export default function ClientCheckoutContent({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [specialIndications, setSpecialIndications] = useState("");
  const [address, setAddress] = useState("");

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const [addressMissingErrorActive, setAddressMissingErrorActive] =
    useState(false);

  const [clientOrderState, setClientOrderState] = useClientOrderContext();
  const [userGlobalState] = useUserGlobalContext();

  const [open, setOpen] = React.useState(false);
  const handleBackToHome = () => {
    setClientOrderState({
      order_products: [],
      order_total_price: 0,
      order_notes: "",
    });
    setOpen(false);
    setValue(0);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSpecialIndicationsTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setSpecialIndications(event.target.value);
  };

  const handleAddressTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  const [isEmptyCartModalOpen, setIsEmptyCartModalOpen] = useState(false);

  function handleEmptyCart() {
    setClientOrderState({
      order_products: [],
      order_total_price: 0,
      order_notes: "",
    });
    setIsEmptyCartModalOpen(false);
  }

  const [
    hasServerRequestProccessedWithError,
    setHasServerRequestProccessedWithError,
  ] = useState(false);
  const [
    hasServerRequestProccessedWithSuccess,
    setHasServerRequestProccessedWithSuccess,
  ] = useState(false);

  useEnhancedEffect(() => {
    console.log(clientOrderState.order_total_price);
  }, []);

  const handlePlaceOrder = async () => {
    if (address === "") {
      if (!addressMissingErrorActive)
        setAddressMissingErrorActive(!addressMissingErrorActive);
    } else {
      const res = await axios.get("http://localhost:3004/api/get");
      const { data } = await res;
      const totalNumberOfOrders = data.length;
      console.log(totalNumberOfOrders);

      const today = new Date();

      const newOrder = {
        orderId: totalNumberOfOrders,
        orderUserId: userGlobalState.id,
        orderProducts: JSON.stringify({
          items: clientOrderState.order_products,
        }),
        orderNotes: specialIndications,
        orderTotalPrice: clientOrderState.order_total_price,
        orderAddress: address,
        orderDate:
          today.getDay() + "." + today.getMonth() + "." + today.getFullYear(),
        orderTime: today.getHours() + ":" + today.getMinutes(),
      };
      try {
        const postResponseData = await axios.post(
          "http://localhost:3004/api/create",
          newOrder
        );
        if (!postResponseData.data.error) {
          if (hasServerRequestProccessedWithError)
            setHasServerRequestProccessedWithError(false);
          setHasServerRequestProccessedWithSuccess(true);
          setOpen(true);
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
    <Box sx={{ width: "100%" }} height="80vh">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
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
              width: 400,
              bgcolor: themeColors.secondary,
              border: "2px solid #000",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {hasServerRequestProccessedWithSuccess
                ? "Comanda dumneavoastra a fost plasata."
                : "Ne cerem scuze, a aparut o eroare la trimiterea comenzii."}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {hasServerRequestProccessedWithSuccess
                ? "Va fi livrata in cel mai scurt timp la adresa dumneavoastra."
                : "Va rugam incercati mai tarziu."}
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
                onClick={handleBackToHome}
                fullWidth
                variant="contained"
                sx={{ mt: 2, color: themeColors.secondary }}
              >
                Inapoi la pagina principala
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={isEmptyCartModalOpen}
          onClose={() => setIsEmptyCartModalOpen(false)}
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
              Sunteti sigur ca doriti sa goliti cosul?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Aceasta actiune nu poate fi revocata.
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
                onClick={() => setIsEmptyCartModalOpen(false)}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mr: 2, color: themeColors.secondary }}
              >
                Renuntare
              </Button>
              <Button
                onClick={handleEmptyCart}
                fullWidth
                variant="contained"
                sx={{ mt: 2, color: themeColors.secondary }}
              >
                Goleste cosul
              </Button>
            </Box>
          </Box>
        </Modal>
        {clientOrderState.order_products.length > 0 ? (
          <Box m={4}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "flex",
            flexDirecton: "row",
            justifyContent: "space-evenly",
          }}
        >
          {clientOrderState.order_products.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ color: "primary.dark" }}
              >
                Pasul anterior
              </Button>
            </Box>
          ) : null}
          {activeStep === 0 ? (
            <Box
              m={4}
              mt={clientOrderState.order_products.length > 0 ? 4 : 20}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Card
                sx={{
                  backgroundColor: themeColors.secondary,
                  display: "flex",
                  flexDirection: "row",
                  padding: 4,
                  justifyContent: "center",
                  height: "100%",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {clientOrderState.order_products.length > 0 ? (
                    <>
                      <Typography
                        mb={4}
                        variant="h3"
                        sx={{ alignSelf: "center" }}
                      >
                        Comanda mea
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h4">Produse:</Typography>
                          <Typography variant="h4">Pret total:</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {clientOrderState.order_products.map(
                            (orderProduct, idx) => (
                              <Typography key={idx} variant="h5">
                                {orderProduct.product_name} x{" "}
                                {orderProduct.product_qty}
                              </Typography>
                            )
                          )}
                          <Typography mt={3} variant="h5">
                            {clientOrderState.order_total_price}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 6, mb: 2, color: themeColors.secondary }}
                        onClick={() => setIsEmptyCartModalOpen(true)}
                      >
                        Goleste cosul
                      </Button>
                    </>
                  ) : (
                    <Typography variant="h3">
                      Cosul dumneavoastra este gol.
                    </Typography>
                  )}
                </Box>
              </Card>
            </Box>
          ) : null}
          {activeStep === 1 ? (
            <Box
              m={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Card
                sx={{
                  backgroundColor: themeColors.secondary,
                  display: "flex",
                  flexDirection: "row",
                  padding: 4,
                  justifyContent: "center",
                  height: "100%",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography mb={4} variant="h3">
                    Indicatii speciale
                  </Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="specialIndications"
                    label="Indicatii speciale"
                    name="specialIndications"
                    autoComplete="specialIndications"
                    autoFocus
                    multiline
                    sx={{
                      backgroundColor: "#fefcf6",
                      width: "80%",
                      marginBottom: 3,
                    }}
                    onChange={handleSpecialIndicationsTextChange}
                    value={specialIndications}
                  />
                </Box>
              </Card>
            </Box>
          ) : null}
          {activeStep === 2 ? (
            <Box
              m={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Card
                sx={{
                  backgroundColor: themeColors.secondary,
                  display: "flex",
                  flexDirection: "row",
                  padding: 4,
                  height: "100%",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography mb={4} variant="h3">
                    Adresa livrare
                  </Typography>
                  <TextField
                    error={addressMissingErrorActive}
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Adresa livrare"
                    name="address"
                    autoComplete="address"
                    autoFocus
                    multiline
                    sx={{ backgroundColor: "#fefcf6", width: "80%" }}
                    onChange={handleAddressTextChange}
                    value={address}
                  />
                  <Box sx={{ width: "80%" }} mt={2}>
                    <Collapse in={addressMissingErrorActive}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setAddressMissingErrorActive(
                                !addressMissingErrorActive
                              );
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        Campul de adresa de livrare este obligatoriu.
                      </Alert>
                    </Collapse>
                  </Box>
                </Box>
              </Card>
            </Box>
          ) : null}
          {clientOrderState.order_products.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Button
                disabled={clientOrderState.order_products.length === 0}
                onClick={activeStep !== 2 ? handleNext : handlePlaceOrder}
                sx={{
                  color: "primary.dark",
                }}
              >
                {activeStep !== 2 ? "Pasul urmator" : "Plasare comanda"}
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <StyledFooter />
      </Box>
    </Box>
  );
}
