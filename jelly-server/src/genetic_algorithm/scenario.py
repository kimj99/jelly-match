from random import randint, random

import numpy as np


class Scenario:
    def __init__(
        self,
        people_ids: list,
        group_ids: list,
        people_prefs: callable,
        group_prefs: callable,
        num_parents: int,
        mutate_prob: float,
    ):
        self.people = people_ids
        self.groups = group_ids
        self.people_prefs = people_prefs
        self.group_prefs = group_prefs
        self.num_groups = len(group_ids)
        self.num_people = len(people_ids)
        self.diversity = self.num_groups * self.num_people
        self.num_parents = num_parents
        self.mutate_prob = mutate_prob
        self.debug = False

    def generate_genome(self) -> np.ndarray:
        return np.random.permutation(self.people)

    def split_genome_to_groups(self, genome: np.ndarray) -> np.ndarray:
        arr = np.array_split(genome, self.num_groups)
        arr = list(frozenset(a) for a in arr)
        return arr

    def split_answer_to_groups(self, genome: np.ndarray):
        temp = self.split_genome_to_groups(genome)
        out = {}
        for index, group in enumerate(temp):
            group_id = self.groups[index]
            out[group_id] = [p for p in group]

        return out

    def score_people(self, group: frozenset) -> int:
        score = 0
        for i in group:
            for j in group:
                if i == j:
                    continue
                score += self.people_prefs(i, j)
        return score

    def score_group(self, group: frozenset, group_num: int) -> int:
        score = self.score_people(group)
        group_id = self.groups[group_num]
        for index, g in enumerate(group):
            score += self.group_prefs(g, group_id)
        return score

    def generate_population(self):
        new_population = []
        for _ in range(self.diversity):
            new_population.append(self.generate_genome())
        return np.array(new_population)

    def score_genome(self, genome: np.ndarray) -> int:
        groups = self.split_genome_to_groups(genome)
        score = 0
        for i, g in enumerate(groups):
            score += self.score_group(g, i)
        return score

    def calc_fitness(self, population):
        out = []
        best = (None, float("inf"))
        for genome in population:
            score = self.score_genome(genome)
            out.append(score)
            if score < best[1]:
                best = genome, score
        return np.array(out), best

    def select_mating_pool(self, population, fitness):
        parents = np.empty((self.num_parents, population.shape[1]))
        for i in range(self.num_parents):
            min_fitness_idx = np.where(fitness == np.min(fitness))
            min_fitness_idx = min_fitness_idx[0][0]
            parents[i] = population[min_fitness_idx]
            fitness[min_fitness_idx] = np.max(fitness) + 1
        return parents.astype(int)

    def breed(self, population):
        chromosomes = population.shape[1]
        offspring = np.empty((self.diversity, chromosomes))

        complete_strand = set(self.people)

        for k in range(self.diversity):
            cross_point1 = randint(0, chromosomes)
            cross_point2 = randint(0, chromosomes)

            small_point = min(cross_point1, cross_point2)
            big_point = max(cross_point1, cross_point2)

            parent = k % population.shape[0]

            strand = population[parent, small_point:big_point]
            extra = complete_strand - set(strand)
            extra = np.random.permutation(list(extra))

            left = extra[:small_point]
            right = extra[small_point:]
            offspring[k, small_point:big_point] = strand
            offspring[k, :small_point] = left
            offspring[k, big_point:] = right

        return offspring.astype(int)

    def mutate(self, population):
        chromosomes = population.shape[1]
        pop_size = population.shape[0]
        for i in range(pop_size):
            rand_val = random()
            if rand_val <= self.mutate_prob:
                swap1 = randint(0, chromosomes - 1)
                swap2 = randint(0, chromosomes - 1)
                population[i, swap1], population[i, swap2] = (
                    population[i, swap2],
                    population[i, swap1],
                )
        return population

    def __call__(self):

        new_population = self.generate_population()
        last_best = float("inf")
        best = None

        for generation in range(1000):
            fitness, best = self.calc_fitness(new_population)
            parents = self.select_mating_pool(new_population, fitness)
            offspring = self.breed(parents)
            new_population = self.mutate(offspring)

            if best[1] < last_best:
                if self.debug:
                    print(f"\tGen {generation}: {best[1]}")
                last_best = best[1]

        return best
