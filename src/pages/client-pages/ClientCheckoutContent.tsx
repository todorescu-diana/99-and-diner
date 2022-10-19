import * as React from "react";
import Box from "@mui/material/Box";
import { themeColors } from "../../theme";
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

  const [open, setOpen] = React.useState(false);
  const handleBackToHome = () => {
    setClientOrderState({ orderProducts: [], orderTotalPrice: 0 });
    setOpen(false);
    setValue(0);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      if (address === "") {
        if (!addressMissingErrorActive)
          setAddressMissingErrorActive(!addressMissingErrorActive);
      } else {
        setOpen(true);
      }
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
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
      orderProducts: [],
      orderTotalPrice: 0,
    });
    setIsEmptyCartModalOpen(false);
  }

  return (
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
            Comanda dumneavoastra a fost plasata.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Va fi livrata in cel mai scurt timp la adresa dumneavoastra.
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
              type="submit"
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
              onClick={handleEmptyCart}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mr: 2, color: themeColors.secondary }}
            >
              Goleste cosul
            </Button>
            <Button
              onClick={() => setIsEmptyCartModalOpen(false)}
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
            >
              Inapoi
            </Button>
          </Box>
        </Box>
      </Modal>
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

      {activeStep === 0 ? (
        <Box m={4}>
          <Card
            sx={{
              backgroundColor: themeColors.secondary,
              display: "flex",
              flexDirection: "row",
              padding: 4,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {clientOrderState.orderProducts.length > 0 ? (
                <>
                  <Typography mb={4} variant="h3">
                    Comanda mea
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                      ml={20}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {clientOrderState.orderProducts.map(
                        (orderProduct, idx) => (
                          <Typography key={idx} variant="h5">
                            {orderProduct.productName} x{" "}
                            {orderProduct.productQty}
                          </Typography>
                        )
                      )}
                      <Typography mt={3} variant="h5">
                        {clientOrderState.orderTotalPrice}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, color: themeColors.secondary }}
                    onClick={() => setIsEmptyCartModalOpen(true)}
                  >
                    Goleste cosul
                  </Button>
                </>
              ) : (
                <Typography mb={4} variant="h3">
                  Cosul dumneavoastra este gol.
                </Typography>
              )}
            </Box>
          </Card>
        </Box>
      ) : null}
      {activeStep === 1 ? (
        <Box m={4}>
          <Card
            sx={{
              backgroundColor: themeColors.secondary,
              display: "flex",
              flexDirection: "row",
              padding: 4,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
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
                sx={{ backgroundColor: "#fefcf6", width: "80%" }}
                onChange={handleSpecialIndicationsTextChange}
                value={specialIndications}
              />
            </Box>
          </Card>
        </Box>
      ) : null}
      {activeStep === 2 ? (
        <Box m={4}>
          <Card
            sx={{
              backgroundColor: themeColors.secondary,
              display: "flex",
              flexDirection: "row",
              padding: 4,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
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
      <Box
        p={4}
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Pasul anterior
        </Button>
        <Button
          disabled={clientOrderState.orderProducts.length === 0}
          onClick={handleNext}
        >
          Pasul urmator
        </Button>
      </Box>
    </Box>
  );
}
