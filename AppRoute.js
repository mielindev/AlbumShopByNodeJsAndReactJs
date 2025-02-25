import express from "express";
import * as middlewares from "./middlewares/index";

import * as Controllers from "./controllers/index";

import * as DTOs from "./dtos/requests/index";
import userRoles from "./constants/userRoles";

const router = express.Router();

export const AppRoute = (app) => {
  // User Routes
  router.post(
    "/users/register",
    middlewares.validate(DTOs.InsertUserRequest),
    middlewares.asyncHandle(Controllers.UserController.register)
  );
  router.post(
    "/users/login",
    middlewares.validate(DTOs.LoginUserRequest),
    middlewares.asyncHandle(Controllers.UserController.userLogin)
  );
  router.get(
    "/users",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.UserController.getUsers)
  );
  router.get(
    "/users/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.UserController.getUserById)
  );
  router.put(
    "/users/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.UserController.updateUser)
  );
  router.delete(
    "/users/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.UserController.deleteUser)
  );

  // Artist Routes

  router.post(
    "/artists",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.InsertArtistRequest),
    middlewares.asyncHandle(Controllers.ArtistController.insertArtist)
  );
  router.get(
    "/artists",
    middlewares.asyncHandle(Controllers.ArtistController.getArtists)
  );
  router.get(
    "/artists/:id",
    middlewares.asyncHandle(Controllers.ArtistController.getArtistById)
  );
  router.put(
    "/artists/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateArtistRequest),
    middlewares.isImageExisted,
    middlewares.asyncHandle(Controllers.ArtistController.updateArtists)
  );
  router.delete(
    "/artists/:id",
    middlewares.asyncHandle(Controllers.ArtistController.deleteArtists),
    middlewares.requireRoles([userRoles.ADMIN])
  );

  // Genre Routes
  router.post(
    "/genres",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertGenreRequest),
    middlewares.asyncHandle(Controllers.GenreController.insertGenre)
  );
  router.get(
    "/genres",
    middlewares.asyncHandle(Controllers.GenreController.getGenres)
  );
  router.get(
    "/genres/:id",
    middlewares.asyncHandle(Controllers.GenreController.getGenreById)
  );
  router.put(
    "/genres/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateGenreRequest),
    middlewares.asyncHandle(Controllers.GenreController.updateGenre)
  );
  router.delete(
    "/genres/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.GenreController.deleteGenre)
  );

  // Genre Detail Routes
  router.post(
    "/genre-details",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertGenreDetailRequest),
    middlewares.asyncHandle(Controllers.GenreDetailController.insertGenreDetail)
  );
  router.get(
    "/genre-details",
    middlewares.asyncHandle(Controllers.GenreDetailController.getGenreDetails)
  );
  router.get(
    "/genre-details/:id",
    middlewares.asyncHandle(
      Controllers.GenreDetailController.getGenreDetailById
    )
  );
  router.put(
    "/genre-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateGenreDetailRequest),
    middlewares.asyncHandle(Controllers.GenreDetailController.updateGenreDetail)
  );
  router.delete(
    "/genre-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.GenreDetailController.deleteGenreDetail)
  );

  // Label Routes
  router.post(
    "/labels",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.InsertLabelRequest),
    middlewares.asyncHandle(Controllers.LabelController.insertLabel)
  );
  router.get(
    "/labels",
    middlewares.asyncHandle(Controllers.LabelController.getLabels)
  );
  router.get(
    "/labels/:id",
    middlewares.asyncHandle(Controllers.LabelController.getLabelById)
  );
  router.put(
    "/labels/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.UpdateLabelRequest),
    middlewares.asyncHandle(Controllers.LabelController.updateLabels)
  );
  router.delete(
    "/labels/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.LabelController.deleteLabels)
  );

  // Format Routes
  router.post(
    "/formats",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertFormatRequest),
    middlewares.asyncHandle(Controllers.FormatController.insertFormat)
  );
  router.get(
    "/formats",
    middlewares.asyncHandle(Controllers.FormatController.getFormats)
  );
  router.get(
    "/formats/:id",
    middlewares.asyncHandle(Controllers.FormatController.getFormatById)
  );
  router.put(
    "/formats/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateFormatRequest),
    middlewares.asyncHandle(Controllers.FormatController.updateFormat)
  );
  router.delete(
    "/formats/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.FormatController.deleteFormat)
  );

  // Format Detail Routes
  router.post(
    "/format-details",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertFormatDetailRequest),
    middlewares.asyncHandle(
      Controllers.FormatDetailController.insertFormatDetail
    )
  );
  router.get(
    "/format-details",
    middlewares.asyncHandle(Controllers.FormatDetailController.getFormatDetails)
  );
  router.get(
    "/format-details/:id",
    middlewares.asyncHandle(
      Controllers.FormatDetailController.getFormatDetailById
    )
  );
  router.put(
    "/format-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateFormatDetailRequest),
    middlewares.asyncHandle(
      Controllers.FormatDetailController.updateFormatDetail
    )
  );
  router.delete(
    "/format-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(
      Controllers.FormatDetailController.deleteFormatDetail
    )
  );

  // Produt Routes
  router.post(
    "/products",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.InsertProductRequest),
    middlewares.asyncHandle(Controllers.ProductController.insertProduct)
  );
  router.get(
    "/products",
    middlewares.asyncHandle(Controllers.ProductController.getProducts)
  );
  router.get(
    "/products/:id",
    middlewares.asyncHandle(Controllers.ProductController.getProductById)
  );
  router.put(
    "/products/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.UpdateProductRequest),
    middlewares.asyncHandle(Controllers.ProductController.updateProduct)
  );
  router.delete(
    "/products/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.ProductController.deleteProduct)
  );

  // Order Routes
  // router.post(
  //   "/orders",
  //   middlewares.validate(DTOs.InsertOrderRequest),
  //   middlewares.asyncHandle(Controllers.OrderController.insertOrder)
  // );
  router.get(
    "/orders",
    middlewares.asyncHandle(Controllers.OrderController.getOrders)
  );
  router.get(
    "/orders/:id",
    middlewares.asyncHandle(Controllers.OrderController.getOrderById)
  );
  router.put(
    "/orders/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.validate(DTOs.UpdateOrderRequest),
    middlewares.asyncHandle(Controllers.OrderController.updateOrder)
  );
  router.delete(
    "/orders/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.OrderController.deleteOrder)
  );

  // Cart Routes
  router.post(
    "/carts",
    middlewares.requireRoles([userRoles.USER]),
    middlewares.validate(DTOs.InsertCartRequest),
    middlewares.asyncHandle(Controllers.CartController.insertCart)
  );
  router.post(
    "/carts/checkout",
    middlewares.asyncHandle(Controllers.CartController.checkoutCart)
  );
  router.get(
    "/carts",
    middlewares.asyncHandle(Controllers.CartController.getAllCarts)
  );
  router.get(
    "/carts/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartController.getCartById)
  );
  router.delete(
    "/carts/:id",
    middlewares.requireRoles([userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartController.deleteCart)
  );

  // Cart Item Routes
  router.post(
    "/cart-items",
    middlewares.requireRoles([userRoles.USER]),
    middlewares.validate(DTOs.InsertCartItemRequest),
    middlewares.asyncHandle(Controllers.CartItemController.insertCartItem)
  );
  router.get(
    "/cart-items",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartItemController.getCartItems)
  );
  router.get(
    "/cart-items/carts/:cart_id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartItemController.getCartItemByCartId)
  );
  router.put(
    "/cart-items/:id",
    middlewares.requireRoles([userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartItemController.updateCartItem)
  );
  router.delete(
    "/cart-items/:id",
    middlewares.requireRoles([userRoles.USER]),
    middlewares.asyncHandle(Controllers.CartItemController.deleteCartItem)
  );

  // Feedback Routes
  router.post(
    "/feedbacks",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.validate(DTOs.InsertFeedBackRequest),
    middlewares.asyncHandle(Controllers.FeedbackController.insertFeedback)
  );
  router.get(
    "/feedbacks",
    middlewares.asyncHandle(Controllers.FeedbackController.getFeedbacks)
  );
  router.get(
    "/feedbacks/:id",
    middlewares.asyncHandle(Controllers.FeedbackController.getFeedbackById)
  );
  router.put(
    "/feedbacks/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.validate(DTOs.UpdateFeedbackRequest),
    middlewares.asyncHandle(Controllers.FeedbackController.updateFeedback)
  );
  router.delete(
    "/feedbacks/:id",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.FeedbackController.deleteFeedback)
  );

  //  Promotion Routes
  router.post(
    "/promotions",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertPromotionRequest),
    middlewares.asyncHandle(Controllers.PromotionController.insertPromotion)
  );
  router.get(
    "/promotions",
    middlewares.asyncHandle(Controllers.PromotionController.getPromotions)
  );
  router.get(
    "/promotions/:id",
    middlewares.asyncHandle(Controllers.PromotionController.getPromotionById)
  );
  router.put(
    "/promotions/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdatePromotionRequest),
    middlewares.asyncHandle(Controllers.PromotionController.updatePromotion)
  );
  router.delete(
    "/promotions/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.PromotionController.deletePromotion)
  );

  //  Promotion Detail Routes
  router.post(
    "/promotion-details",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertPromotionDetailRequest),
    middlewares.asyncHandle(
      Controllers.PromotionDetailController.insertPromotionDetail
    )
  );
  router.get(
    "/promotion-details",
    middlewares.asyncHandle(
      Controllers.PromotionDetailController.getPromotionDetails
    )
  );
  router.get(
    "/promotion-details/:id",
    middlewares.asyncHandle(
      Controllers.PromotionDetailController.getPromotionDetailById
    )
  );
  router.put(
    "/promotion-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdatePromotionDetailRequest),
    middlewares.asyncHandle(
      Controllers.PromotionDetailController.updatePromotionDetail
    )
  );
  router.delete(
    "/promotion-details/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(
      Controllers.PromotionDetailController.deletePromotionDetail
    )
  );

  // News Routes
  router.post(
    "/news",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.InsertNewsRequest),
    middlewares.asyncHandle(Controllers.NewController.insertNewsArticles)
  );
  router.get(
    "/news",
    middlewares.asyncHandle(Controllers.NewController.getNewsArticles)
  );
  router.get(
    "/news/:id",
    middlewares.asyncHandle(Controllers.NewController.getNewsById)
  );
  router.put(
    "/news/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.isImageExisted,
    middlewares.validate(DTOs.UpdateNewsRequest),
    middlewares.asyncHandle(Controllers.NewController.updateNewsArticles)
  );
  router.delete(
    "/news/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.NewController.deleteNewsArticles)
  );

  // News Detail Routes
  router.post(
    "/news-detail",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.InsertNewsDetailRequest),
    middlewares.asyncHandle(Controllers.NewsDetailController.insertNewsDetail)
  );
  router.get(
    "/news-detail",
    middlewares.asyncHandle(Controllers.NewsDetailController.getNewsDetails)
  );
  router.get(
    "/news-detail/:id",
    middlewares.asyncHandle(Controllers.NewsDetailController.getNewsDetailById)
  );
  router.put(
    "/news-detail/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.validate(DTOs.UpdateNewsDetailRequest),
    middlewares.asyncHandle(Controllers.NewsDetailController.updateNewsDetails)
  );
  router.delete(
    "/news-detail/:id",
    middlewares.requireRoles([userRoles.ADMIN]),
    middlewares.asyncHandle(Controllers.NewsDetailController.deleteNewsDetails)
  );

  // Image Routes
  router.post(
    "/images/upload",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.upload.single("image"),
    middlewares.asyncHandle(Controllers.ImageController.uploadImage)
  );
  router.post(
    "/images/cloudinary/upload",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.uploadCloudinary.single("image"),
    middlewares.asyncHandle(Controllers.ImageController.uploadCloundinary)
  );
  router.delete(
    "/images/delete",
    middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    Controllers.ImageController.deletedImage
  );
  router.get(
    "/images/:fileName",
    // middlewares.requireRoles([userRoles.ADMIN, userRoles.USER]),
    middlewares.asyncHandle(Controllers.ImageController.viewImages)
  );

  app.use("/api/", router);
};
