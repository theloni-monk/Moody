# Project Outline

The app has two main views - input and analysis

## Input

The input view will present the user with a series of scales on which they can rate the following qualities: Mood, Energy, Sleep Hours, Sleep Quality, Motivation, Medication, and Dose

Once a user populates a given input, the input will vanish and the next will appear. This is done to encourage the user to share gut feelings and to not linger on any feeling so that they could manipulate the results.

The inputs will be stored in a database as a json object that is keyed by the date it was stored at (on a per-user basis obviously). The user will only be allowed to input once per day, (ideally towards the end of the day). - thus a day will be from 7am - 7am (so the user can fill it out at 1am and it won't count for a new day)

## Analysis

I'm not sure the best way to display analysis. There will be a dynamic system where there are multiple analyisis widgets that can be mixed and matched by the user. I think 