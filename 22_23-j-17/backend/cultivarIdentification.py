
import numpy as np
import keras.utils as image
from keras.models import load_model
# from tensorflow.keras.utils import img_to_array
from keras.applications import imagenet_utils

def getCultivar(img_path):
    
    loaded_model=load_model('backend\densenet121_new4.hdf5')

    IMAGE_SIZE = (300,300)
    img = img_path.resize(IMAGE_SIZE)
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = imagenet_utils.preprocess_input(x)

    #Predictions
    preds = loaded_model.predict(x)
    pred_name = np.argmax(preds)
    cultivar =''

    if pred_name == 0:
        cultivar = 'TRI2025'
        # print("TRI2025 Cultivar.")
    elif pred_name == 1:
        cultivar = 'Other'
        # print("Other Cultivar.")
    else:
        cultivar = 'TRI2024'
        # print("TRI2024 Cultivar.")

    return {'Cultivar': cultivar}
         
# img_path = 'assets/20221213_120627.jpg'
# Cultivar = getCultivar(img_path)

# print("Classified Cultivar: ", Cultivar['Cultivar'])         


# import numpy as np
# import keras.utils as image
# from keras.models import load_model
# from keras.applications import imagenet_utils
# import PIL.Image

# def getCultivar(img_paths):
    
#     loaded_model=load_model('backend\densenet121_new4.hdf5')

#     IMAGE_SIZE = (300,300)
#     pred_names = []

#     for img_path in img_paths:
#         img = PIL.Image.open(img_path)
#         img = img.resize(IMAGE_SIZE)
#         x = image.img_to_array(img)
#         x = np.expand_dims(x, axis=0)
#         x = imagenet_utils.preprocess_input(x)

#         # Predictions
#         preds = loaded_model.predict(x)
#         pred_name = np.argmax(preds)

#         pred_names.append(pred_name)
#     # print("PRED NAME - > ",pred_names)
#     # Find majority cultivar
#     unique, counts = np.unique(pred_names, return_counts=True)
#     index = np.argmax(counts)
#     if unique[index] == 0:
#         cultivar = 'TRI2025'
#     elif unique[index] == 1:
#         cultivar = 'Other'
#     else:
#         cultivar = 'TRI2024'

#     return {'Cultivar': cultivar}


# img_paths = ['assets/20221213_120627.jpg', 'assets/20221213_102825_1.jpg','assets/IMG_2873.jpg']
# result = getCultivar(img_paths)
# print(result)
