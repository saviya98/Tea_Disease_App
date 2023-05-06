# import requests
# import io
# import PIL.Image
# import PIL.ExifTags

# def get_image_metadata_from_uri(uri):
#     response = requests.get(uri)
#     img = PIL.Image.open(io.BytesIO(response.content))

#     exif = {
#         PIL.ExifTags.TAGS[k]: v
#         for k, v in img._getexif().items()
#         if k in PIL.ExifTags.TAGS
#     }

#     north = exif['GPSInfo'][2]
#     east = exif['GPSInfo'][4]
#     captured_date = exif['GPSInfo'][29]

#     north_decimal = north[0] + (north[1]/60) + (north[2]/3600)
#     east_decimal = east[0] + (east[1]/60) + (east[2]/3600)

#     north_decimal = north_decimal.numerator / north_decimal.denominator
#     east_decimal = east_decimal.numerator / east_decimal.denominator

#     return {
#         'north_decimal': north_decimal,
#         'east_decimal': east_decimal,
#         'captured_date': captured_date,
#     }



import pickle
import PIL.Image
import PIL.ExifTags



def get_image_metadata(img):

    #Extract metadata from the image
    exif = {
        PIL.ExifTags.TAGS[k]: v
        for k, v in img._getexif().items()
        if k in PIL.ExifTags.TAGS
    }

    # Extract GPS location data
    north = exif['GPSInfo'][2] if 'GPSInfo' in exif and 2 in exif['GPSInfo'] else 0
    east = exif['GPSInfo'][4] if 'GPSInfo' in exif and 4 in exif['GPSInfo'] else 0
    captured_date = exif['GPSInfo'][29] if 'GPSInfo' in exif and 29 in exif['GPSInfo'] else 'null'

    #Converting the GPS coordinate format
    north_decimal = north[0] + (north[1]/60) + (north[2]/3600)
    east_decimal = east[0] + (east[1]/60) + (east[2]/3600)

    north_decimal = north_decimal.numerator / north_decimal.denominator
    east_decimal = east_decimal.numerator / east_decimal.denominator

    return {
        'north_decimal': north_decimal,
        'east_decimal': east_decimal,
        'captured_date': captured_date,
    }

# with open('get_metadata_pickled.pkl', 'wb') as f:
#     pickle.dump(get_image_metadata, f)

# img = PIL.Image.open('assets/IMG_7209_1.jpg')
# metadata = get_image_metadata(img)
# print("North Decimal: ", metadata['north_decimal'])
# print("East Decimal: ", metadata['east_decimal'])
# print("Captured Date: ", metadata['captured_date'])
# north_decimal = metadata['north_decimal']
