import { toastController } from "@ionic/vue";

/**
 * composable for creating toast notifications in the app.
 */
export const useToast = () => {
  const createErrorToast = async (message: string) => {
    const toast = await toastController.create({
      message,
      duration: 5000,
      position: "top",
      color: "danger",
      animated: true,
    });

    await toast.present();
  };

  return {
    createErrorToast,
  };
};
