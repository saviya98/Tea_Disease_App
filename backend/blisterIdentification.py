
# import numpy as np
# import keras.utils as image
# from keras.models import load_model
# # from tensorflow.keras.utils import img_to_array
# from keras.applications import imagenet_utils

# def getBlister(img_path):
    
#     loaded_model=load_model('backend/keras_model.h5')

#     IMAGE_SIZE = (300,300)
#     img = img_path.resize(IMAGE_SIZE)
#     x = image.img_to_array(img)
#     x = np.expand_dims(x, axis=0)
#     x = imagenet_utils.preprocess_input(x)

#     #Predictions
#     preds = loaded_model.predict(x)
#     pred_name = np.argmax(preds)
#     blister =''

#     if preds > 0.5:
#         print("The image is in class A")
#     else:
#         print("The image is in class B")
         
# img_path = 'assets/20221213_120627.jpg'
# Blister = getBlister(img_path)

# # print("Classified Blister: ", Blister['blister'])         



import tensorflow as tf
from keras.models import load_model
import numpy as np

def getBlister(img_path):
    # Load the model from the saved .h5 file
    model = load_model('backend/keras_model.h5')

    # Load and preprocess the input image for classification
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.

    # Define the class labels
    class_labels = ['NotBlisterBlight', 'BlisterBlight']

    # Use the loaded model to predict the class probabilities for the input image
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions)

    # Get the predicted class index and label
    # class_idx = np.argmax(predictions)
    class_label = class_labels[class_idx]
    blister = ''

    if class_label == 0:
        blister = 'Blister Identified'
    else:
        blister = 'Blister Not Identified'

    return {'Blister': blister}

# img_path = 'assets/20221213_120627.jpg'
# Blister = getBlister(img_path)

# print("Classified Cultivar: ", Blister['Blister'])  