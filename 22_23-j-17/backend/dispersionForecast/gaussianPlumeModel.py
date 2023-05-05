# %%
from PIL import Image
import numpy as np
import sys
from scipy.special import erfcinv as erfcinv
import tqdm as tqdm
import time
import matplotlib.pyplot as plt
import seaborn as sns

# import openWeatherMap

# Calling Open Weather Map API
# current_weather = openWeatherMap.weather
current_weather = ([2.498e+01, 2.578e+01, 8.600e-01, 4.970e+00, 3.400e+01, 1.000e+04,
                    1.011e+03])

# from matplotlib import rc
# rc('font',**{'family':'sans-serif','sans-serif':['Helvetica']})
# for Palatino and other serif fonts use:
# rc('font',**{'family':'serif','serif':['Palatino']})
# rc('text', usetex=True)

########### calc sigmas ###########


def calc_sigmas(CATEGORY, x1):

    x = np.abs(x1)

    a = np.zeros(np.shape(x))
    b = np.zeros(np.shape(x))
    c = np.zeros(np.shape(x))
    d = np.zeros(np.shape(x))

    if CATEGORY == 1:  # very unstable
        # vertical
        ind = np.where((x < 100.) & (x > 0.))
        a[ind] = 122.800
        b[ind] = 0.94470

        ind = np.where((x >= 100.) & (x < 150.))
        a[ind] = 158.080
        b[ind] = 1.05420

        ind = np.where((x >= 150.) & (x < 200.))
        a[ind] = 170.220
        b[ind] = 1.09320

        ind = np.where((x >= 200.) & (x < 250.))
        a[ind] = 179.520
        b[ind] = 1.12620

        ind = np.where((x >= 250.) & (x < 300.))
        a[ind] = 217.410
        b[ind] = 1.26440

        ind = np.where((x >= 300.) & (x < 400.))
        a[ind] = 258.89
        b[ind] = 1.40940

        ind = np.where((x >= 400.) & (x < 500.))
        a[ind] = 346.75
        b[ind] = 1.7283

        ind = np.where((x >= 500.) & (x < 3110.))
        a[ind] = 453.85
        b[ind] = 2.1166

        ind = np.where((x >= 3110.))
        a[ind] = 453.85
        b[ind] = 2.1166

        # cross wind
        c[:] = 24.1670
        d[:] = 2.5334
    elif CATEGORY == 2:  # moderately unstable
        # vertical
        ind = np.where((x < 200.) & (x > 0.))
        a[ind] = 90.673
        b[ind] = 0.93198

        ind = np.where((x >= 200.) & (x < 400.))
        a[ind] = 98.483
        b[ind] = 0.98332

        ind = np.where(x >= 400.)
        a[ind] = 109.3
        b[ind] = 1.09710

        # cross wind
        c[:] = 18.3330
        d[:] = 1.8096

    elif CATEGORY == 3:  # slightly unstable
        # vertical
        a[:] = 61.141
        b[:] = 0.91465
        # cross wind
        c[:] = 12.5
        d[:] = 1.0857
    elif CATEGORY == 4:  # neutral
        # vertical
        ind = np.where((x < 300.) & (x > 0.))
        a[ind] = 34.459
        b[ind] = 0.86974

        ind = np.where((x >= 300.) & (x < 1000.))
        a[ind] = 32.093
        b[ind] = 0.81066

        ind = np.where((x >= 1000.) & (x < 3000.))
        a[ind] = 32.093
        b[ind] = 0.64403

        ind = np.where((x >= 3000.) & (x < 10000.))
        a[ind] = 33.504
        b[ind] = 0.60486

        ind = np.where((x >= 10000.) & (x < 30000.))
        a[ind] = 36.650
        b[ind] = 0.56589

        ind = np.where(x >= 30000.)
        a[ind] = 44.053
        b[ind] = 0.51179

        # cross wind
        c[:] = 8.3330
        d[:] = 0.72382
    elif CATEGORY == 5:  # moderately stable
        # vertical
        ind = np.where((x < 100.) & (x > 0.))
        a[ind] = 24.26
        b[ind] = 0.83660

        ind = np.where((x >= 100.) & (x < 300.))
        a[ind] = 23.331
        b[ind] = 0.81956

        ind = np.where((x >= 300.) & (x < 1000.))
        a[ind] = 21.628
        b[ind] = 0.75660

        ind = np.where((x >= 1000.) & (x < 2000.))
        a[ind] = 21.628
        b[ind] = 0.63077

        ind = np.where((x >= 2000.) & (x < 4000.))
        a[ind] = 22.534
        b[ind] = 0.57154

        ind = np.where((x >= 4000.) & (x < 10000.))
        a[ind] = 24.703
        b[ind] = 0.50527

        ind = np.where((x >= 10000.) & (x < 20000.))
        a[ind] = 26.970
        b[ind] = 0.46713

        ind = np.where((x >= 20000.) & (x < 40000.))
        a[ind] = 35.420
        b[ind] = 0.37615

        ind = np.where(x >= 40000.)
        a[ind] = 47.618
        b[ind] = 0.29592

        # cross wind
        c[:] = 6.25
        d[:] = 0.54287
    elif CATEGORY == 6:  # very stable
        # vertical
        ind = np.where((x < 200.) & (x > 0.))
        a[ind] = 15.209
        b[ind] = 0.81558

        ind = np.where((x >= 200.) & (x < 700.))
        a[ind] = 14.457
        b[ind] = 0.78407

        ind = np.where((x >= 700.) & (x < 1000.))
        a[ind] = 13.953
        b[ind] = 0.68465

        ind = np.where((x >= 1000.) & (x < 2000.))
        a[ind] = 13.953
        b[ind] = 0.63227

        ind = np.where((x >= 2000.) & (x < 3000.))
        a[ind] = 14.823
        b[ind] = 0.54503

        ind = np.where((x >= 3000.) & (x < 7000.))
        a[ind] = 16.187
        b[ind] = 0.46490

        ind = np.where((x >= 7000.) & (x < 15000.))
        a[ind] = 17.836
        b[ind] = 0.41507

        ind = np.where((x >= 15000.) & (x < 30000.))
        a[ind] = 22.651
        b[ind] = 0.32681

        ind = np.where((x >= 30000.) & (x < 60000.))
        a[ind] = 27.074
        b[ind] = 0.27436

        ind = np.where(x >= 60000.)
        a[ind] = 34.219
        b[ind] = 0.21716

        # cross wind
        c[:] = 4.1667
        d[:] = 0.36191
    else:
        sys.exit()

    sig_z = a*(x/1000.)**b
    sig_z[np.where(sig_z[:] > 5000.)] = 5000.

    theta = 0.017453293*(c-d*np.log(np.abs(x+1e-15)/1000.))
    sig_y = 465.11628*x/1000.*np.tan(theta)

    return (sig_y, sig_z)

########## gauss func ##########


def gauss_func(Q, u, dir1, x, y, z, xs, ys, H, Dy, Dz, STABILITY):
    u1 = u
    x1 = x-xs  # shift the coordinates so that stack is centre point
    y1 = y-ys

    # components of u in x and y directions
    wx = u1*np.sin((dir1-180.)*np.pi/180.)
    wy = u1*np.cos((dir1-180.)*np.pi/180.)

    # Need angle between point x, y and the wind direction, so use scalar product:
    dot_product = wx*x1+wy*y1
    # product of magnitude of vectors:
    magnitudes = u1*np.sqrt(x1**2.+y1**2.)

    # angle between wind and point (x,y)
    subtended = np.arccos(dot_product/(magnitudes+1e-15))
    # distance to point x,y from stack
    hypotenuse = np.sqrt(x1**2.+y1**2.)

    # distance along the wind direction to perpendilcular line that intesects
    # x,y
    downwind = np.cos(subtended)*hypotenuse

    # Now calculate distance cross wind.
    crosswind = np.sin(subtended)*hypotenuse

    ind = np.where(downwind > 0.)
    C = np.zeros((len(x), len(y)))

    # sig_y=sqrt(2.*Dy.*downwind./u1);
    # sig_z=sqrt(2.*Dz.*downwind./u1);

    # calculate sigmas based on stability and distance downwind
    (sig_y, sig_z) = calc_sigmas(STABILITY, downwind)

    C[ind] = Q/(2.*np.pi*u1*sig_y[ind]*sig_z[ind]) \
        * np.exp(-crosswind[ind]**2./(2.*sig_y[ind]**2.))  \
        * (np.exp(-(z[ind]-H)**2./(2.*sig_z[ind]**2.)) +
            np.exp(-(z[ind]+H)**2./(2.*sig_z[ind]**2.)))
    return C

########## gaussian plume model ##########


def smooth(y, box_pts):
    box = np.ones(box_pts)/box_pts
    y_smooth = np.convolve(y, box, mode='same')
    return y_smooth


# SECTION 0: Definitions (normally don't modify this section)
# view
PLAN_VIEW = 1
HEIGHT_SLICE = 2
SURFACE_TIME = 3
NO_PLOT = 4

# wind field
CONSTANT_WIND = 1
FLUCTUATING_WIND = 2
PREVAILING_WIND = 3

# number of stacks
ONE_STACK = 1
TWO_STACKS = 2
THREE_STACKS = 3

# stability of the atmosphere
CONSTANT_STABILITY = 1
ANNUAL_CYCLE = 2
stability_str = ['Very unstable', 'Moderately unstable', 'Slightly unstable',
                 'Neutral', 'Moderately stable', 'Very stable']
# Aerosol properties
HUMIDIFY = 2
DRY_AEROSOL = 1

SODIUM_CHLORIDE = 1
SULPHURIC_ACID = 2
ORGANIC_ACID = 3
AMMONIUM_NITRATE = 4
nu = [2., 2.5, 1., 2.]
rho_s = [2160., 1840., 1500., 1725.]
Ms = [58.44e-3, 98e-3, 200e-3, 80e-3]
Mw = 18e-3

dxy = 100          # resolution of the model in both x and y directions
dz = 10
x = np.mgrid[-2500:2500+dxy:dxy]  # solve on a 5 km domain
y = x              # x-grid is same as y-grid
###########################################################################

# Change humidify according to the humidity
if current_weather[2] >= 0.7:
    humidify = HUMIDIFY
else:
    humidify = DRY_AEROSOL

# SECTION 1: Configuration
# Variables can be changed by the user+++++++++++++++++++++++++++++++++++++
RH = 0.90
aerosol_type = SODIUM_CHLORIDE

dry_size = 60e-9

stab1 = 1  # set from 1-6
stability_used = CONSTANT_STABILITY

output = PLAN_VIEW
x_slice = 26  # position (1-50) to take the slice in the x-direction
y_slice = 1  # position (1-50) to plot concentrations vs time

wind = PREVAILING_WIND
stacks = ONE_STACK
stack_x = [0., 1000., -200.]
stack_y = [0., 250., -500.]

Q = [40., 40., 40.]  # mass emitted per unit time
H = [50., 50., 50.]  # stack height, m
days = 50          # run the model for 365 days
# --------------------------------------------------------------------------
times = np.mgrid[1:(days)*24+1:1]/24.

Dy = 10.
Dz = 10.

# SECTION 2: Act on the configuration information

# Decide which stability profile to use
if stability_used == CONSTANT_STABILITY:

    stability = stab1*np.ones((days*24, 1))
    stability_str = stability_str[stab1-1]
elif stability_used == ANNUAL_CYCLE:

    stability = np.round(2.5*np.cos(times*2.*np.pi/(365.))+3.5)
    stability_str = 'Annual cycle'
else:
    sys.exit()

# decide what kind of run to do, plan view or y-z slice, or time series
if output == PLAN_VIEW or output == SURFACE_TIME or output == NO_PLOT:

    # array to store data, initialised to be zero
    C1 = np.zeros((len(x), len(y), days*24))

    # x and y defined at all positions on the grid
    [x, y] = np.meshgrid(x, y)
    z = np.zeros(np.shape(x))    # z is defined to be at ground level.
elif output == HEIGHT_SLICE:
    z = np.mgrid[0:500+dz:dz]       # z-grid

    # array to store data, initialised to be zero
    C1 = np.zeros((len(y), len(z), days*24))

    # y and z defined at all positions on the grid
    [y, z] = np.meshgrid(y, z)
    # x is defined to be x at x_slice
    x = x[x_slice]*np.ones(np.shape(y))
else:
    sys.exit()

# Set the wind based on input flags++++++++++++++++++++++++++++++++++++++++
wind_speed = current_weather[3]*np.ones((days*24, 1))  # m/s
wind_dir = current_weather[4]

if wind == CONSTANT_WIND:
    wind_dir = 0.*np.ones((days*24, 1))
    wind_dir_str = 'Constant wind'
elif wind == FLUCTUATING_WIND:
    wind_dir = 360.*np.random.rand(days*24, 1)
    wind_dir_str = 'Random wind'
elif wind == PREVAILING_WIND:
    wind_dir = -np.sqrt(2.)*erfcinv(2.*np.random.rand(24*days, 1)
                                    )*40.  # norminv(rand(days.*24,1),0,40)
    # note at this point you can add on the prevailing wind direction, i.e.
    wind_dir = wind_dir+200
    wind_dir[np.where(wind_dir >= 360.)] = \
        np.mod(wind_dir[np.where(wind_dir >= 360)], 360)
    wind_dir_str = 'Prevailing wind'
else:
    sys.exit()
# --------------------------------------------------------------------------

# SECTION 3: Main loop
# For all times...
C1 = np.zeros((len(x), len(y), len(wind_dir)))
for i in tqdm.tqdm(range(0, len(wind_dir))):
    for j in range(0, stacks):
        C = np.ones((len(x), len(y)))
        C = gauss_func(Q[j], wind_speed[i], wind_dir[i], x, y, z,
                       stack_x[j], stack_y[j], H[j], Dy, Dz, stability[i])
        C1[:, :, i] = C1[:, :, i]+C

# SECTION 4: Post process / output

# decide whether to humidify the aerosol and hence increase the mass
if humidify == DRY_AEROSOL:
    print('do not humidify')
elif humidify == HUMIDIFY:
    mass = np.pi/6.*rho_s[aerosol_type]*dry_size**3.
    moles = mass/Ms[aerosol_type]

    nw = RH*nu[aerosol_type]*moles/(1.-RH)
    mass2 = nw*Mw+moles*Ms[aerosol_type]
    C1 = C1*mass2/mass
else:
    sys.exit()

######## output the plots #########

if output == PLAN_VIEW:
    plt.figure()
    plt.ion()

    plt.pcolor(x, y, np.mean(C1, axis=2)*1e6, cmap='jet')
    plt.clim((0, 1e2))
    plt.title(stability_str + '\n' + wind_dir_str)
    plt.xlabel('x (metres)')
    plt.ylabel('y (metres)')
    cb1 = plt.colorbar()
    cb1.set_label('$\mu$ g m$^{-3}$')
    # plt.show()

elif output == HEIGHT_SLICE:
    plt.figure()
    plt.ion()

    plt.pcolor(y, z, np.mean(C1, axis=2)*1e6, cmap='jet')
    plt.clim((0, 1e2))
    plt.xlabel('y (metres)')
    plt.ylabel('z (metres)')
    plt.title(stability_str + '\n' + wind_dir_str)
    cb1 = plt.colorbar()
    cb1.set_label('$\mu$ g m$^{-3}$')
    # plt.show()

elif output == SURFACE_TIME:
    f, (ax1, ax2) = plt.subplots(2, sharex=True, sharey=False)
    ax1.plot(times, 1e6*np.squeeze(C1[y_slice, x_slice, :]))
    try:
        ax1.plot(times, smooth(
            1e6*np.squeeze(C1[y_slice, x_slice, :]), 24), 'r')
        ax1.legend(('Hourly mean', 'Daily mean'))
    except:
        sys.exit()

    ax1.set_xlabel('time (days)')
    ax1.set_ylabel('Mass loading ($\mu$ g m$^{-3}$)')
    ax1.set_title(stability_str + '\n' + wind_dir_str)

    ax2.plot(times, stability)
    ax2.set_xlabel('time (days)')
    ax2.set_ylabel('Stability parameter')
    # f.show()

elif output == NO_PLOT:
    print('don''t plot')
else:
    sys.exit()

    ###############
# %%


def overlay_on_map():
    import scipy.io as sio

    # Overlay concentrations on map
    plt.ion()
    # mat_contents = sio.loadmat('map_green_lane')
    # plt.figure()
    # plt.imshow(mat_contents['A'],
    #            extent=[np.min(mat_contents['ximage']),
    #            np.max(mat_contents['ximage']),
    #            np.min(mat_contents['yimage']),
    #            np.max(mat_contents['yimage'])])

    # plt.xlabel('x (m)')
    # plt.ylabel('y (m)')
    cs = plt.contour(x, y, np.mean(C1, axis=2)*1e6, cmap='hot')
    plt.clabel(cs, cs.levels, inline=True, fmt='%.1f', fontsize=5)
    # plt.savefig('plotNew.png', transparent=True)
    plt.savefig('plotNew2.png')
    print("running the function")
    # plt.show()

    # # Crop image
    # img = Image.open('plot.png')
    # cropped_img = img.crop((50, 50, 200, 200))
    # cropped_img.save('plot.png')
    return


if __name__ == "__main__":
    overlay_on_map()

# %%
