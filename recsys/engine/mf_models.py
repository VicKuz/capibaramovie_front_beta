from lenskit.datasets import MovieLens
import pandas as pd
from model_evaluation import kfold_evaluation
from lenskit.algorithms.mf_common import MFPredictor

def train_model():
    predictor = MFPredictor()
    predictor.
    return 0

if __name__ == 'main':
    mlsmall = MovieLens('../datasets/movielens100k')
    X = mlsmall.ratings
    train_model()