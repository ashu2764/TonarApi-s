import { createContainer, asClass } from "awilix";
import { WishlistController } from "./controller/wishlist.controller.js";
import { WishlistUsecase } from "./usecases/wishlist.usecases.js";
import { WishlistRepository } from "./repository/wishlist.repository.js";

export const wishlistContainer = createContainer();

wishlistContainer.register({
  wishlistRepository: asClass(WishlistRepository).singleton(),
  wishlistUsecase: asClass(WishlistUsecase).singleton(),
  wishlistController: asClass(WishlistController).singleton()
});
