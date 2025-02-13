import express from "express";
import {
  asyncHandle,
  validate,
  upload,
  isImageExisted,
  uploadCloudinary,
} from "./middlewares/index";

import * as ArtistController from "./controllers/ArtistController";
import * as GenreController from "./controllers/GenreController";
import * as GenreDetailController from "./controllers/GenreDetailController";
import * as LabelController from "./controllers/LabelController";
import * as FormatController from "./controllers/FormatController";
import * as FormatDetailController from "./controllers/FormatDetailController";
import * as ProductController from "./controllers/ProductController";
import * as UserController from "./controllers/UserController";
import * as OrderController from "./controllers/OrderController";
import * as FeedbackController from "./controllers/FeedbackController";
import * as PromotionController from "./controllers/PromotionController";
import * as PromotionDetailController from "./controllers/PromotionDetailController";
import * as NewController from "./controllers/NewController";
import * as NewsDetailController from "./controllers/NewsDetailController";
import * as ImageController from "./controllers/ImageController";
import * as CartController from "./controllers/CartController";
import * as CartItemController from "./controllers/CartItemController";

import InsertArtistRequest from "./dtos/requests/artist/InsertArtistRequest";
import UpdateArtistRequest from "./dtos/requests/artist/UpdateArtistRequest";
import InsertGenreRequest from "./dtos/requests/genre/InsertGenreRequest";
import UpdateGenreRequest from "./dtos/requests/genre/UpdateGenreRequest";
import InsertFormatRequest from "./dtos/requests/format/InsertFormatRequest";
import UpdateFormatRequest from "./dtos/requests/format/UpdateFormatRequest";
import InsertLabelRequest from "./dtos/requests/label/InsertLabelRequest";
import UpdateLabelRequest from "./dtos/requests/label/UpdateLabelRequest";
import InsertProductRequest from "./dtos/requests/product/InsertProductRequest";
import UpdateProductRequest from "./dtos/requests/product/UpdateProductRequest";
import InsertUserRequest from "./dtos/requests/user/InsertProductRequest";
import InsertOrderRequest from "./dtos/requests/order/InsertOrderRequest";
import UpdateOrderRequest from "./dtos/requests/order/UpdateOrderRequest";
import InsertFeedBackRequest from "./dtos/requests/feedback/InsertFeedBackRequest";
import UpdateFeedbackRequest from "./dtos/requests/feedback/UpdateFeedbackRequest";
import InsertPromotionRequest from "./dtos/requests/promotion/InsertPromotionRequest";
import UpdatePromotionRequest from "./dtos/requests/promotion/UpdatePromotionRequest";
import InsertPromotionDetailRequest from "./dtos/requests/promotion_detail/InsertPromotionDetailRequest";
import UpdatePromotionDetailRequest from "./dtos/requests/promotion_detail/UpdatePromotionDetailRequest";
import InsertFormatDetailRequest from "./dtos/requests/format_detail/InsertFormatDetailRequest";
import UpdateFormatDetailRequest from "./dtos/requests/format_detail/UpdateFormatDetailRequest";
import InsertGenreDetailRequest from "./dtos/requests/genre_detail/InsertGenreDetailRequest";
import UpdateGenreDetailRequest from "./dtos/requests/genre_detail/UpdateGenreDetailRequest";
import InsertNewsRequest from "./dtos/requests/news/InsertNewsRequest";
import InsertNewsDetailRequest from "./dtos/requests/news_detail/InsertNewsDetailRequest";
import UpdateNewsRequest from "./dtos/requests/news/UpdateNewsRequest";
import UpdateNewsDetailRequest from "./dtos/requests/news_detail/UpdateNewsDetailRequest";
import InsertCartRequest from "./dtos/requests/cart/InsertCartRequest";
import InsertCartItemRequest from "./dtos/requests/cart_item/InsertCartItemRequest";

const router = express.Router();

export const AppRoute = (app) => {
  // User Routes
  router.post(
    "/users/register",
    validate(InsertUserRequest),
    asyncHandle(UserController.register)
  );
  router.get("/users", asyncHandle(UserController.getUsers));
  router.get("/users/:id", asyncHandle(UserController.getUserById));
  router.delete("/users/:id", asyncHandle(UserController.deleteUser));

  // Artist Routes
  router.post(
    "/artists",
    isImageExisted,
    validate(InsertArtistRequest),
    ArtistController.insertArtist
  );
  router.get("/artists", asyncHandle(ArtistController.getArtists));
  router.get("/artists/:id", asyncHandle(ArtistController.getArtistById));
  router.put(
    "/artists/:id",
    isImageExisted,
    validate(UpdateArtistRequest),
    asyncHandle(ArtistController.updateArtists)
  );
  router.delete("/artists/:id", asyncHandle(ArtistController.deleteArtists));

  // Genre Routes
  router.post(
    "/genres",
    validate(InsertGenreRequest),
    asyncHandle(GenreController.insertGenre)
  );
  router.get("/genres", asyncHandle(GenreController.getGenres));
  router.get("/genres/:id", asyncHandle(GenreController.getGenreById));
  router.put(
    "/genres/:id",
    validate(UpdateGenreRequest),
    asyncHandle(GenreController.updateGenre)
  );
  router.delete("/genres/:id", asyncHandle(GenreController.deleteGenre));

  // Genre Detail Routes
  router.post(
    "/genre-details",
    validate(InsertGenreDetailRequest),
    asyncHandle(GenreDetailController.insertGenreDetail)
  );
  router.get(
    "/genre-details",
    asyncHandle(GenreDetailController.getGenreDetails)
  );
  router.get(
    "/genre-details/:id",
    asyncHandle(GenreDetailController.getGenreDetailById)
  );
  router.put(
    "/genre-details/:id",
    validate(UpdateGenreDetailRequest),
    asyncHandle(GenreDetailController.updateGenreDetail)
  );
  router.delete(
    "/genre-details/:id",
    asyncHandle(GenreDetailController.deleteGenreDetail)
  );

  // Label Routes
  router.post(
    "/labels",
    isImageExisted,
    validate(InsertLabelRequest),
    asyncHandle(LabelController.insertLabel)
  );
  router.get("/labels", asyncHandle(LabelController.getLabels));
  router.get("/labels/:id", asyncHandle(LabelController.getLabelById));
  router.put(
    "/labels/:id",
    isImageExisted,
    validate(UpdateLabelRequest),
    asyncHandle(LabelController.updateLabels)
  );
  router.delete("/labels/:id", asyncHandle(LabelController.deleteLabels));

  // Format Routes
  router.post(
    "/formats",
    validate(InsertFormatRequest),
    asyncHandle(FormatController.insertFormat)
  );
  router.get("/formats", asyncHandle(FormatController.getFormats));
  router.get("/formats/:id", asyncHandle(FormatController.getFormatById));
  router.put(
    "/formats/:id",
    validate(UpdateFormatRequest),
    asyncHandle(FormatController.updateFormat)
  );
  router.delete("/formats/:id", asyncHandle(FormatController.deleteFormat));

  // Format Detail Routes
  router.post(
    "/format-details",
    validate(InsertFormatDetailRequest),
    asyncHandle(FormatDetailController.insertFormatDetail)
  );
  router.get(
    "/format-details",
    asyncHandle(FormatDetailController.getFormatDetails)
  );
  router.get(
    "/format-details/:id",
    asyncHandle(FormatDetailController.getFormatDetailById)
  );
  router.put(
    "/format-details/:id",
    validate(UpdateFormatDetailRequest),
    asyncHandle(FormatDetailController.updateFormatDetail)
  );
  router.delete(
    "/format-details/:id",
    asyncHandle(FormatDetailController.deleteFormatDetail)
  );

  // Produt Routes
  router.post(
    "/products",
    isImageExisted,
    validate(InsertProductRequest),
    asyncHandle(ProductController.insertProduct)
  );
  router.get("/products", asyncHandle(ProductController.getProducts));
  router.get("/products/:id", asyncHandle(ProductController.getProductById));
  router.put(
    "/products/:id",
    isImageExisted,
    validate(UpdateProductRequest),
    asyncHandle(ProductController.updateProduct)
  );
  router.delete("/products/:id", asyncHandle(ProductController.deleteProduct));

  // Order Routes
  router.post(
    "/orders",
    validate(InsertOrderRequest),
    asyncHandle(OrderController.insertOrder)
  );
  router.get("/orders", asyncHandle(OrderController.getOrders));
  router.get("/orders/:id", asyncHandle(OrderController.getOrderById));
  router.put(
    "/orders/:id",
    validate(UpdateOrderRequest),
    asyncHandle(OrderController.updateOrder)
  );
  router.delete("/orders/:id", asyncHandle(OrderController.deleteOrder));

  // Cart Routes
  router.post(
    "/carts",
    validate(InsertFeedBackRequest),
    asyncHandle(CartController.insertCart)
  );
  router.get("/carts", asyncHandle(CartController.getAllCarts));
  router.get("/carts/:id", asyncHandle(CartController.getCartById));
  router.delete("/carts/:id", asyncHandle(CartController.deleteCart));

  // Cart Item Routes
  router.post(
    "/cart-items",
    validate(InsertFeedBackRequest),
    asyncHandle(CartItemController.insertCartItem)
  );
  router.get("/cart-items", asyncHandle(CartItemController.getCartItems));
  router.get(
    "/cart-items/:id",
    asyncHandle(CartItemController.getCartItemById)
  );
  router.put("/cart-items/:id", asyncHandle(CartItemController.updateCartItem));
  router.delete(
    "/cart-items/:id",
    asyncHandle(CartItemController.deleteCartItem)
  );

  // Feedback Routes
  router.post(
    "/feedbacks",
    validate(InsertFeedBackRequest),
    asyncHandle(FeedbackController.insertFeedback)
  );
  router.get("/feedbacks", asyncHandle(FeedbackController.getFeedbacks));
  router.get("/feedbacks/:id", asyncHandle(FeedbackController.getFeedbackById));
  router.put(
    "/feedbacks/:id",
    validate(UpdateFeedbackRequest),
    asyncHandle(FeedbackController.updateFeedback)
  );
  router.delete(
    "/feedbacks/:id",
    asyncHandle(FeedbackController.deleteFeedback)
  );

  //  Promotion Routes
  router.post(
    "/promotions",
    validate(InsertPromotionRequest),
    asyncHandle(PromotionController.insertPromotion)
  );
  router.get("/promotions", asyncHandle(PromotionController.getPromotions));
  router.get(
    "/promotions/:id",
    asyncHandle(PromotionController.getPromotionById)
  );
  router.put(
    "/promotions/:id",
    validate(UpdatePromotionRequest),
    asyncHandle(PromotionController.updatePromotion)
  );
  router.delete(
    "/promotions/:id",
    asyncHandle(PromotionController.deletePromotion)
  );

  //  Promotion Detail Routes
  router.post(
    "/promotion-details",
    validate(InsertPromotionDetailRequest),
    asyncHandle(PromotionDetailController.insertPromotionDetail)
  );
  router.get(
    "/promotion-details",
    asyncHandle(PromotionDetailController.getPromotionDetails)
  );
  router.get(
    "/promotion-details/:id",
    asyncHandle(PromotionDetailController.getPromotionDetailById)
  );
  router.put(
    "/promotion-details/:id",
    validate(UpdatePromotionDetailRequest),
    asyncHandle(PromotionDetailController.updatePromotionDetail)
  );
  router.delete(
    "/promotion-details/:id",
    asyncHandle(PromotionDetailController.deletePromotionDetail)
  );

  // News Routes
  router.post(
    "/news",
    isImageExisted,
    validate(InsertNewsRequest),
    asyncHandle(NewController.insertNewsArticles)
  );
  router.get("/news", asyncHandle(NewController.getNewsArticles));
  router.get("/news/:id", asyncHandle(NewController.getNewsById));
  router.put(
    "/news/:id",
    isImageExisted,
    validate(UpdateNewsRequest),
    asyncHandle(NewController.updateNewsArticles)
  );
  router.delete("/news/:id", asyncHandle(NewController.deleteNewsArticles));

  // News Detail Routes
  router.post(
    "/news-detail",
    validate(InsertNewsDetailRequest),
    asyncHandle(NewsDetailController.insertNewsDetail)
  );
  router.get("/news-detail", asyncHandle(NewsDetailController.getNewsDetails));
  router.get(
    "/news-detail/:id",
    asyncHandle(NewsDetailController.getNewsDetailById)
  );
  router.put(
    "/news-detail/:id",
    validate(UpdateNewsDetailRequest),
    asyncHandle(NewsDetailController.updateNewsDetails)
  );
  router.delete(
    "/news-detail/:id",
    asyncHandle(NewsDetailController.deleteArtists)
  );

  // Image Routes
  router.post(
    "/images/upload",
    upload.single("image"),
    asyncHandle(ImageController.uploadImage)
  );
  router.post(
    "/images/cloudinary/upload",
    uploadCloudinary.single("image"),
    asyncHandle(ImageController.uploadCloundinary)
  );
  router.delete("/images/delete", ImageController.deletedImage);
  router.get("/images/:fileName", asyncHandle(ImageController.viewImages));

  app.use("/api/", router);
};
