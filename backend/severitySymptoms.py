# # from google.colab.patches import cv2_imshow
# # from mrcnn_demo.visualize import random_colors, get_mask_contours, draw_mask
# # import mrcnn_demo.visualize
# from sklearn.metrics import accuracy_score
# # from mrcnn_demo.utils import *
# # import mrcnn_demo.utils
# # import matplotlib.pyplot as plt
# # from mrcnn_demo.m_rcnn import *
# # import mrcnn_demo.m_rcnn
# import numpy as np
# import keras.utils as image
# from keras.models import load_model
# # from tensorflow.keras.utils import img_to_array
# from keras.applications import imagenet_utils
# import sys
# sys.path.append('backend\maskrcnn_colab')


# def getSeverity(img_path):

#     # # Define class names
#     # class_names = {1: "Initial Stage", 2: "Blister Stage",
#     #                3: "Necrotic Stage", 4: "Blister Leaf"}

#     # # Load Image
#     # IMAGE_SIZE = (512, 512)
#     # img = img_path.resize(IMAGE_SIZE)
#     # class_number = 4
#     # test_model, inference_config = load_inference_model(
#     #     class_number, "backend\mask_rcnn_object_0100.h5")
#     # image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#     # # Detect results
#     # r = test_model.detect([image])[0]
#     # colors = random_colors(80)

#     # # Get Coordinates and show it on the image
#     # object_count = len(r["class_ids"])
#     # for i in range(object_count):
#     #     # 1. Mask
#     #     mask = r["masks"][:, :, i]
#     #     contours = get_mask_contours(mask)
#     #     for cnt in contours:
#     #         cv2.polylines(img, [cnt], True, colors[i], 2)
#     #         img = draw_mask(img, [cnt], colors[i])

#     # # Get class name
#     # class_id = r["class_ids"][0]
#     # class_name = class_names[class_id]
#     # return img, class_name
