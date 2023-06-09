# -*- coding: utf-8 -*-
"""Train_CustomMask_RCNN.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1-1YX6GPCZhBT0v8DPf_lXOXNxfIRonfy

# Mask R-CNN Training
"""

from google.colab import drive
drive.mount('/content/drive')

"""## **1. Installation**

Update to Tensorflow 2.5
"""

# Update CUDA for TF 2.5
# downloading the CUDA library for TensorFlow 2.5 from the NVIDIA website using the "wget" command. The library is for the Ubuntu 20.04 OS
!wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/libcudnn8_8.1.0.77-1+cuda11.2_amd64.deb

# using the "dpkg" command to install the package file "libcudnn8_8.1.0.77-1+cuda11.2_amd64.deb" on a Debian-based operating system. 
#The "dpkg" command is used to install, remove, and manage Debian software packages
!dpkg -i libcudnn8_8.1.0.77-1+cuda11.2_amd64.deb

# Check if package has been installed
!ls -l /usr/lib/x86_64-linux-gnu/libcudnn.so.*

# Upgrade Tensorflow
!pip install --upgrade tensorflow==2.5.0

"""Install Mask R-CNN"""

# Commented out IPython magic to ensure Python compatibility.
import sys
sys.path.append('/content/drive/My Drive/maskrcnn_colab/')

import mrcnn_demo.m_rcnn
from mrcnn_demo.m_rcnn import *
# %matplotlib inline

import matplotlib.pyplot as plt
import mrcnn_demo.utils
from mrcnn_demo.utils import *
from sklearn.metrics import accuracy_score

import mrcnn_demo.visualize
from mrcnn_demo.visualize import random_colors, get_mask_contours, draw_mask
from mrcnn_demo.visualize import *
from google.colab.patches import cv2_imshow
import cv2

#!nvidia-smi

"""## **2. Image Dataset**

Load your annotated dataset

"""

# Extract Images
images_path = "/content/drive/MyDrive/maskrcnn_colab/mrcnn_demo/train3.zip"
annotations_path = "/content/drive/MyDrive/maskrcnn_colab/mrcnn_demo/train3_coco.json"

extract_images(os.path.join("/content/",images_path), "/content/drive/MyDrive/maskrcnn_colab/mrcnn_demo/dataset")

dataset_train = load_image_dataset(os.path.join("/content/", annotations_path), "/content//drive/MyDrive/maskrcnn_colab/mrcnn_demo/dataset", "train")
dataset_val = load_image_dataset(os.path.join("/content/", annotations_path), "/content//drive/MyDrive/maskrcnn_colab/mrcnn_demo/dataset", "val")
class_number = dataset_train.count_classes()

print('Train: %d' % len(dataset_train.image_ids))
print('Validation: %d' % len(dataset_val.image_ids))
print("Classes: {}".format(class_number))

# Load image samples
display_image_samples(dataset_train)

"""##**3. Training**

Train Mask RCNN on your custom Dataset.
"""

# Load Configuration
config = CustomConfig(class_number,)

#STEPS_PER_EPOCH = 50

# steps_epoch = 100

# config.display()
model = load_training_model(config)

# Start Training

history = train_head(model, dataset_train, dataset_train, config)

"""## **4. Evaluate Model**"""

plt.plot(history.history['loss'])
  plt.plot(history.history['val_loss'])
  plt.title('Model Loss')
  plt.ylabel('Loss')
  plt.xlabel('Epoch')
  plt.legend(['Train', 'Validation'], loc='upper left')
  plt.show()

"""## **5. Test the model on Random Validation Data**"""

# Load Test Model
# The latest trained model will be loaded
test_model, inference_config = load_test_model(class_number)

# Test on a random image
test_random_image(test_model, dataset_val, inference_config)

"""## **6. Model Testing**"""

# import mrcnn_demo.visualize
# from mrcnn_demo.visualize import random_colors, get_mask_contours, draw_mask
# from google.colab.patches import cv2_imshow

# Load Image
img = cv2.imread("/content/drive/MyDrive/maskrcnn_colab/mrcnn_demo/Test_Image/IMG_6725.jpg")
#img = cv2.imread("/content/drive/MyDrive/maskrcnn_colab/mrcnn_demo/Test_Image/IMG_6762.JPG")

model_path = model.find_last()
test_model, inference_config = load_inference_model(class_number, model_path)

# test_model, inference_config = load_inference_model(class_number, "/content/mask_rcnn_object_0005.h5")
image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Detect results
r = test_model.detect([image])[0]
colors = random_colors(80)

from google.colab.patches import cv2_imshow
# Get Coordinates and show it on the image
object_count = len(r["class_ids"])
for i in range(object_count):
    # 1. Mask
    mask = r["masks"][:, :, i]
    contours = get_mask_contours(mask)
    for cnt in contours:
        cv2.polylines(img, [cnt], True, colors[i], 2)
        img = draw_mask(img, [cnt], colors[i])

# Set the desired size
width = 300
height = 300

# Resize the image to the desired size
img = cv2.resize(img, (width, height), interpolation = cv2.INTER_CUBIC)

cv2_imshow(img)