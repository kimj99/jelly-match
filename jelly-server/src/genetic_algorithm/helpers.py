from multiprocessing.pool import Pool

import numpy as np

from src.genetic_algorithm.scenario import Scenario


def generate_test_prefs(num):
    return np.random.permutation(num)


def generate_person_prefs_array(num_people):
    out = {}
    for i in range(num_people):
        current = {}
        arr = generate_test_prefs(num_people)
        arr = np.insert(arr, i, -1)
        for index, person in enumerate(arr):
            current[index] = person
        out[i] = current
    return out


def generate_group_prefs_array(num_people, num_groups):
    out = {}
    for i in range(num_people):
        current = {}
        arr = generate_test_prefs(num_groups)
        for index, person in enumerate(arr):
            current[index] = person
        out[i] = current
    return out


def generate_preference_lookup(preference_array):
    def preference_lookup(from_id, to_id):
        if from_id not in preference_array:
            raise Exception(f"{from_id} {to_id} {preference_array}")
            return 0

        if to_id not in preference_array[from_id]:
            raise Exception(f"{from_id} {to_id} {preference_array}")
            return 0

        return preference_array[from_id][to_id]

    return preference_lookup


def generate_test_scenario(num_people, num_groups):
    people_ids = [i for i in range(num_people)]
    group_ids = [i for i in range(num_groups)]

    temp = generate_person_prefs_array(num_people)
    person_prefs = generate_preference_lookup(temp)
    temp = generate_group_prefs_array(num_people, num_groups)
    group_prefs = generate_preference_lookup(temp)

    return Scenario(people_ids, group_ids, person_prefs, group_prefs, 2, 0.05)


def run_species(scenario: Scenario, num_species: int, num_cores: int):
    species = []
    with Pool(num_cores) as p:
        species = [p.apply_async(scenario) for _ in range(num_species)]
        results = [s.get() for s in species]

    best = (None, float("inf"))
    for r in results:
        if r[1] < best[1]:
            best = r
    return best
