import express from "express";
import {
  asyncHandle,
  validate,
  upload,
  isImageExisted,
  uploadCloudinary,
} from "./middlewares/index";

import * as Controllers from "./controllers/index";

import * as DTOs from "./dtos/requests/index";

const router = express.Router();

export const AppRoute = (app) => {
  // User Routes
  router.post(
    "/users/register",
    validate(DTOs.InsertUserRequest),
    asyncHandle(Controllers.UserController.register)
  );
  router.get("/users", asyncHandle(Controllers.UserController.getUsers));
  router.get("/users/:id", asyncHandle(Controllers.UserController.getUserById));
  router.delete(
    "/users/:id",
    asyncHandle(Controllers.UserController.deleteUser)
  );

  // Artist Routes
  router.post(
    "/artists",
    isImageExisted,
    validate(DTOs.InsertArtistRequest),
    asyncHandle(Controllers.ArtistController.insertArtist)
  );
  router.get("/artists", asyncHandle(Controllers.ArtistController.getArtists));
  router.get(
    "/artists/:id",
    asyncHandle(Controllers.ArtistController.getArtistById)
  );
  router.put(
    "/artists/:id",
    isImageExisted,
    validate(DTOs.UpdateArtistRequest),
    asyncHandle(Controllers.ArtistController.updateArtists)
  );
  router.delete(
    "/artists/:id",
    asyncHandle(Controllers.ArtistController.deleteArtists)
  );

  // Genre Routes
  router.post(
    "/genres",
    validate(DTOs.InsertGenreRequest),
    asyncHandle(Controllers.GenreController.insertGenre)
  );
  router.get("/genres", asyncHandle(Controllers.GenreController.getGenres));
  router.get(
    "/genres/:id",
    asyncHandle(Controllers.GenreController.getGenreById)
  );
  router.put(
    "/genres/:id",
    validate(DTOs.UpdateGenreRequest),
    asyncHandle(Controllers.GenreController.updateGenre)
  );
  router.delete(
    "/genres/:id",
    asyncHandle(Controllers.GenreController.deleteGenre)
  );

  // Genre Detail Routes
  router.post(
    "/genre-details",
    validate(DTOs.InsertGenreDetailRequest),
    asyncHandle(Controllers.GenreDetailController.insertGenreDetail)
  );
  router.get(
    "/genre-details",
    asyncHandle(Controllers.GenreDetailController.getGenreDetails)
  );
  router.get(
    "/genre-details/:id",
    asyncHandle(Controllers.GenreDetailController.getGenreDetailById)
  );
  router.put(
    "/genre-details/:id",
    validate(DTOs.UpdateGenreDetailRequest),
    asyncHandle(Controllers.GenreDetailController.updateGenreDetail)
  );
  router.delete(
    "/genre-details/:id",
    asyncHandle(Controllers.GenreDetailController.deleteGenreDetail)
  );

  // Label Routes
  router.post(
    "/labels",
    isImageExisted,
    validate(DTOs.InsertLabelRequest),
    asyncHandle(Controllers.LabelController.insertLabel)
  );
  router.get("/labels", asyncHandle(Controllers.LabelController.getLabels));
  router.get(
    "/labels/:id",
    asyncHandle(Controllers.LabelController.getLabelById)
  );
  router.put(
    "/labels/:id",
    isImageExisted,
    validate(DTOs.UpdateLabelRequest),
    asyncHandle(Controllers.LabelController.updateLabels)
  );
  router.delete(
    "/labels/:id",
    asyncHandle(Controllers.LabelController.deleteLabels)
  );

  // Format Routes
  router.post(
    "/formats",
    validate(DTOs.InsertFormatRequest),
    asyncHandle(Controllers.FormatController.insertFormat)
  );
  router.get("/formats", asyncHandle(Controllers.FormatController.getFormats));
  router.get(
    "/formats/:id",
    asyncHandle(Controllers.FormatController.getFormatById)
  );
  router.put(
    "/formats/:id",
    validate(DTOs.UpdateFormatRequest),
    asyncHandle(Controllers.FormatController.updateFormat)
  );
  router.delete(
    "/formats/:id",
    asyncHandle(Controllers.FormatController.deleteFormat)
  );

  // Format Detail Routes
  router.post(
    "/format-details",
    validate(DTOs.InsertFormatDetailRequest),
    asyncHandle(Controllers.FormatDetailController.insertFormatDetail)
  );
  router.get(
    "/format-details",
    asyncHandle(Controllers.FormatDetailController.getFormatDetails)
  );
  router.get(
    "/format-details/:id",
    asyncHandle(Controllers.FormatDetailController.getFormatDetailById)
  );
  router.put(
    "/format-details/:id",
    validate(DTOs.UpdateFormatDetailRequest),
    asyncHandle(Controllers.FormatDetailController.updateFormatDetail)
  );
  router.delete(
    "/format-details/:id",
    asyncHandle(Controllers.FormatDetailController.deleteFormatDetail)
  );

  // Produt Routes
  router.post(
    "/products",
    isImageExisted,
    validate(DTOs.InsertProductRequest),
    asyncHandle(Controllers.ProductController.insertProduct)
  );
  router.get(
    "/products",
    asyncHandle(Controllers.ProductController.getProducts)
  );
  router.get(
    "/products/:id",
    asyncHandle(Controllers.ProductController.getProductById)
  );
  router.put(
    "/products/:id",
    isImageExisted,
    validate(DTOs.UpdateProductRequest),
    asyncHandle(Controllers.ProductController.updateProduct)
  );
  router.delete(
    "/products/:id",
    asyncHandle(Controllers.ProductController.deleteProduct)
  );

  // Order Routes
  router.post(
    "/orders",
    validate(DTOs.InsertOrderRequest),
    asyncHandle(Controllers.OrderController.insertOrder)
  );
  router.get("/orders", asyncHandle(Controllers.OrderController.getOrders));
  router.get(
    "/orders/:id",
    asyncHandle(Controllers.OrderController.getOrderById)
  );
  router.put(
    "/orders/:id",
    validate(DTOs.UpdateOrderRequest),
    asyncHandle(Controllers.OrderController.updateOrder)
  );
  router.delete(
    "/orders/:id",
    asyncHandle(Controllers.OrderController.deleteOrder)
  );

  // Cart Routes
  router.post(
    "/carts",
    validate(DTOs.InsertCartRequest),
    asyncHandle(Controllers.CartController.insertCart)
  );
  router.get("/carts", asyncHandle(Controllers.CartController.getAllCarts));
  router.get("/carts/:id", asyncHandle(Controllers.CartController.getCartById));
  router.delete(
    "/carts/:id",
    asyncHandle(Controllers.CartController.deleteCart)
  );

  // Cart Item Routes
  router.post(
    "/cart-items",
    validate(DTOs.InsertCartItemRequest),
    asyncHandle(Controllers.CartItemController.insertCartItem)
  );
  router.get(
    "/cart-items",
    asyncHandle(Controllers.CartItemController.getCartItems)
  );
  router.get(
    "/cart-items/carts/:cart_id",
    asyncHandle(Controllers.CartItemController.getCartItemByCartId)
  );
  router.put(
    "/cart-items/:id",
    asyncHandle(Controllers.CartItemController.updateCartItem)
  );
  router.delete(
    "/cart-items/:id",
    asyncHandle(Controllers.CartItemController.deleteCartItem)
  );

  // Feedback Routes
  router.post(
    "/feedbacks",
    validate(DTOs.InsertFeedBackRequest),
    asyncHandle(Controllers.FeedbackController.insertFeedback)
  );
  router.get(
    "/feedbacks",
    asyncHandle(Controllers.FeedbackController.getFeedbacks)
  );
  router.get(
    "/feedbacks/:id",
    asyncHandle(Controllers.FeedbackController.getFeedbackById)
  );
  router.put(
    "/feedbacks/:id",
    validate(DTOs.UpdateFeedbackRequest),
    asyncHandle(Controllers.FeedbackController.updateFeedback)
  );
  router.delete(
    "/feedbacks/:id",
    asyncHandle(Controllers.FeedbackController.deleteFeedback)
  );

  //  Promotion Routes
  router.post(
    "/promotions",
    validate(DTOs.InsertPromotionRequest),
    asyncHandle(Controllers.PromotionController.insertPromotion)
  );
  router.get(
    "/promotions",
    asyncHandle(Controllers.PromotionController.getPromotions)
  );
  router.get(
    "/promotions/:id",
    asyncHandle(Controllers.PromotionController.getPromotionById)
  );
  router.put(
    "/promotions/:id",
    validate(DTOs.UpdatePromotionRequest),
    asyncHandle(Controllers.PromotionController.updatePromotion)
  );
  router.delete(
    "/promotions/:id",
    asyncHandle(Controllers.PromotionController.deletePromotion)
  );

  //  Promotion Detail Routes
  router.post(
    "/promotion-details",
    validate(DTOs.InsertPromotionDetailRequest),
    asyncHandle(Controllers.PromotionDetailController.insertPromotionDetail)
  );
  router.get(
    "/promotion-details",
    asyncHandle(Controllers.PromotionDetailController.getPromotionDetails)
  );
  router.get(
    "/promotion-details/:id",
    asyncHandle(Controllers.PromotionDetailController.getPromotionDetailById)
  );
  router.put(
    "/promotion-details/:id",
    validate(DTOs.UpdatePromotionDetailRequest),
    asyncHandle(Controllers.PromotionDetailController.updatePromotionDetail)
  );
  router.delete(
    "/promotion-details/:id",
    asyncHandle(Controllers.PromotionDetailController.deletePromotionDetail)
  );

  // News Routes
  router.post(
    "/news",
    isImageExisted,
    validate(DTOs.InsertNewsRequest),
    asyncHandle(Controllers.NewController.insertNewsArticles)
  );
  router.get("/news", asyncHandle(Controllers.NewController.getNewsArticles));
  router.get("/news/:id", asyncHandle(Controllers.NewController.getNewsById));
  router.put(
    "/news/:id",
    isImageExisted,
    validate(DTOs.UpdateNewsRequest),
    asyncHandle(Controllers.NewController.updateNewsArticles)
  );
  router.delete(
    "/news/:id",
    asyncHandle(Controllers.NewController.deleteNewsArticles)
  );

  // News Detail Routes
  router.post(
    "/news-detail",
    validate(DTOs.InsertNewsDetailRequest),
    asyncHandle(Controllers.NewsDetailController.insertNewsDetail)
  );
  router.get(
    "/news-detail",
    asyncHandle(Controllers.NewsDetailController.getNewsDetails)
  );
  router.get(
    "/news-detail/:id",
    asyncHandle(Controllers.NewsDetailController.getNewsDetailById)
  );
  router.put(
    "/news-detail/:id",
    validate(DTOs.UpdateNewsDetailRequest),
    asyncHandle(Controllers.NewsDetailController.updateNewsDetails)
  );
  router.delete(
    "/news-detail/:id",
    asyncHandle(Controllers.NewsDetailController.deleteArtists)
  );

  // Image Routes
  router.post(
    "/images/upload",
    upload.single("image"),
    asyncHandle(Controllers.ImageController.uploadImage)
  );
  router.post(
    "/images/cloudinary/upload",
    uploadCloudinary.single("image"),
    asyncHandle(Controllers.ImageController.uploadCloundinary)
  );
  router.delete("/images/delete", Controllers.ImageController.deletedImage);
  router.get(
    "/images/:fileName",
    asyncHandle(Controllers.ImageController.viewImages)
  );

  app.use("/api/", router);
};
