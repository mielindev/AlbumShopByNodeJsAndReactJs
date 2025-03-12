import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../../apis/product.api";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../../store/slices/cart.slice";

const contents = ["01 audio CD", "01 booklet", "02 card bo góc (tổng 5 mẫu)"];

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    data: res,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getProductById", id],
    queryFn: () => productApi.getProductById(id),
  });

  const productDetail = res?.data || {};

  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productDetail?.format_details?.length) {
      setSelectedOption(productDetail.format_details[0]);
    }
  }, [productDetail]);

  if (isLoading) {
    return (
      <Box
        height={"80vh"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        height={"80vh"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="error">Failed to load product details.</Typography>
      </Box>
    );
  }

  return (
    <Box
      maxWidth="lg"
      mx="auto"
      p={4}
      bgcolor={`rgba(255,255,255,.7)`}
      borderRadius={2}
    >
      <Grid2 container spacing={5}>
        {/* Left: Image Gallery */}
        <Grid2 size={4}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={productDetail.image}
              sx={{ width: "100%", height: 400, objectFit: "center" }}
            />
          </Card>
        </Grid2>

        {/* Right: Product Info */}
        <Grid2 size={8}>
          <Typography variant="h4" fontWeight={600}>
            {productDetail.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" mt={1}>
            {productDetail.artist.name}
          </Typography>
          {selectedOption && (
            <Typography variant="h5" color="primary" fontWeight={600} mt={1}>
              {selectedOption.price.toLocaleString()} VND
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" whiteSpace="pre-line">
            {productDetail.description}
          </Typography>

          {selectedOption ? (
            <Box>
              <Typography variant="h6" fontWeight={600} mt={2}>
                Mỗi {selectedOption.format.name} - {productDetail.name} bao gồm:
              </Typography>
              <ul>
                {contents.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          ) : null}

          {productDetail.format_details?.length > 0 && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Chọn phiên bản</InputLabel>
              <Select
                value={selectedOption?.format?.id || ""}
                onChange={(e) => {
                  const newOption = productDetail.format_details.find(
                    (opt) => opt.format.id === e.target.value
                  );
                  setSelectedOption(newOption);
                }}
              >
                {productDetail.format_details.map((option) => (
                  <MenuItem key={option.format.id} value={option.format.id}>
                    {option.format.name} - {option.price.toLocaleString()} VND
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Quantity Selector & Add to Cart */}
          <Stack direction="row" alignItems="center" spacing={2} mt={3}>
            <IconButton
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton onClick={() => setQuantity((prev) => prev + 1)}>
              <Add />
            </IconButton>

            <Button
              variant="contained"
              color="warning"
              startIcon={<ShoppingCart />}
              sx={{
                borderRadius: 2,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              onClick={() => {
                const data = {
                  id: productDetail.id,
                  name: productDetail.name,
                  image: productDetail.image,
                  format_details: selectedOption,
                  quantity: quantity,
                };
                dispatch(addtoCart(data));
              }}
            >
              Thêm vào giỏ
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
}
