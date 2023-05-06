import cv2
import numpy as np
import PIL.Image
from PIL import Image

def getBlisterSample(img):
  
    # Define the new width and height
    new_width = 640
    new_height = 480

    # Resize the image
    resized_img = cv2.resize(img, (new_width, new_height))

    # Convert to grayscale
    gray = cv2.cvtColor(resized_img, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to separate background from foreground
    ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)

    # Find contours of all objects in the image
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Extract the contour of the wooden quadrant object with the largest area
    largest_contour = max(contours, key=cv2.contourArea)

    # Compute the bounding rectangle of the largest contour
    x,y,w,h = cv2.boundingRect(largest_contour)

    # Crop out the area inside the rectangle
    cropped = resized_img[y:y+h,x:x+w]

    # Remove alpha channel
    cropped = cropped[:,:,:3]

    # ######################################################3
    # Convert to HSV color space
    hsv = cv2.cvtColor(cropped, cv2.COLOR_BGR2HSV)

    # Define the color segmentation bounds for each category
    color_bounds = {
        'Translucent': [(30, 137, 176), (34, 255, 243)],
        'Blister_Under': [(50, 0, 145), (110, 42, 255)],
        'Blister_Upper': [(27, 44, 196), (34, 153, 255)],
        'Necro': [(0, 3, 9), (179, 41, 161)]
    }

    # Create masks for each color category and apply them to the image
    results = {}
    for category, bounds in color_bounds.items():
        lower_bound = np.array(bounds[0], dtype=np.uint8)
        upper_bound = np.array(bounds[1], dtype=np.uint8)
        mask = cv2.inRange(hsv, lower_bound, upper_bound)
        result = cv2.bitwise_and(cropped, cropped, mask=mask)
        results[category] = result

    # Create images with identified hsv areas in red color for each category
    red_results = {}
    percentages = {}
    for category, result in results.items():
        # Convert the image to grayscale
        gray = cv2.cvtColor(result, cv2.COLOR_BGR2GRAY)
        # Threshold the image
        _, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        # Draw contours on the original image with red color
        red_result = np.copy(cropped)
        cv2.drawContours(red_result, contours, -1, (0, 0, 255), 2)
        red_results[category] = red_result
        # Calculate the percentage of the category in the image
        area = cv2.countNonZero(thresh)
        total_area = cropped.shape[0] * cropped.shape[1]
        percentage = (area / total_area) * 100
        percentages[category] = round(percentage, 3)
        # Save the image
        cv2.imwrite(category+'.jpg', red_result)

    # Display the results and percentages for each category
    data = []
    for category, result in red_results.items():
        data.append((percentages[category]))
        # print(category + " percentage: " + str(percentages[category]) + "%")
    # print(data)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return {
        'Translucent': data[0],
        'Blister_Under': data[1],
        'Blister_Upper': data[2],
        'Necro': data[3],
    }

# img  = 'assets\IMG_3875.jpg'
# getBlisterSample(img)
# img = PIL.Image.open('../assets/IMG_3875.jpg')
# blisterData = getBlisterSample(img)

# print("Translucent Percentage: ", blisterData['Translucent'],'%')
# print("Blister Percentage: ", blisterData['Blister'],'%')
# print("Necro Percentage: ", blisterData['Necro'],'%')
# print("Green Percentage: ", blisterData['Green'],'%')