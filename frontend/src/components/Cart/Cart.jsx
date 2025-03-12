import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/tableStyles";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../../store/slices/cart.slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

export default function Cart({ open, handleCloseCart }) {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (sum, item) => sum + item.format_details.price * item.quantity,
    0
  );

  const handleRemoveItem = (id, formatId) => {
    dispatch(removeItem({ id, format_details: { format: { id: formatId } } }));
  };

  return (
    <Box p={1}>
      <Typography
        component={"h3"}
        variant={"h5"}
        textAlign={"center"}
        fontWeight={600}
        color="white"
        bgcolor={`rgba(255,255,255,.1)`}
        p={2}
        boxShadow={`rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`}
      >
        GIỎ HÀNG
      </Typography>
      {cartItems.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                <StyledTableCell align="center">Định dạng</StyledTableCell>
                <StyledTableCell align="right">Đơn giá</StyledTableCell>
                <StyledTableCell align="center">Số lượng</StyledTableCell>
                <StyledTableCell align="right">Tạm tính</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.format_details.format.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.format_details.price.toLocaleString()} đ
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      style={{ width: "50px", textAlign: "center" }}
                      readOnly // To mimic the static quantity input in the image
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(
                      item.format_details.price * item.quantity
                    ).toLocaleString()}{" "}
                  </StyledTableCell>
                  <StyledTableCell align={"center"}>
                    <IconButton
                      onClick={() => {
                        handleRemoveItem(
                          item.id,
                          item.format_details?.format?.id
                        );
                      }}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"40vh"}
          component={"h3"}
          variant={"h4"}
          fontWeight={600}
          bgcolor={"white"}
          borderRadius={2}
          fontStyle={"italic"}
        >
          Không có dữ liệu
        </Typography>
      )}

      <Stack direction={"row"} justifyContent={"flex-start"} mt={2}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={() => {
            navigate(PATH.HOME);
          }}
        >
          TIẾP TỤC MUA HÀNG
        </Button>
      </Stack>
      <Box style={{ marginTop: "20px", textAlign: "right" }}>
        <strong>Tổng tiền: {total.toLocaleString()} đ</strong>
      </Box>
      <Box style={{ marginTop: "20px", textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
          }}
        >
          TIỀN HÀNH THANH TOÁN
        </Button>
      </Box>
    </Box>
  );
}
