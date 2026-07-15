# Rationale

This document is an attempt to show my thought process during this challenge.

## Basic strategy 

1. Think about the problem trying to walk on the shoes of the customer.
2. Code a minimum (bare-bone) solution
3. Optimize

## 1. The challenge

The original statement of the challenge is located at [original.md](original.md). 
I decided to sort the information in a more structured way, to make it easier 
to understand and to help me to think about the problem.

### Context of validation

#### Inputs

##### Constants

| Symbol | Value |
| ------ | ----- |
| $c_1$  | $5$   |
| $c_2$  | $12$  |

##### Variables

| Definition                                       | Symbol | Unit               | Minimum   | Maximum   | Default   |
| ------------------------------------------------ | ------ | ------------------ | --------- | --------- | --------- |
| Fermentation duration<sup>\*</sup>               | $t$    | $[h]$              | _TBD_     | _TBD_     | $12$      |
| Initial bacterial concentration                  | $X_0$  | $[cells/l]$        | $10^4$    | $10^8$    | $10^6$    |
| Initial lactic acid concentration<sup>\*\*</sup> | $p_0$  | $[\mathrm{mol/l}]$ | $10^{-8}$ | $10^{-4}$ | $10^{-6}$ |
| Bacterial growth rate                            | $\mu$  | $[cells/h]$        | $0.1$     | $2$       | $1$       |
| Lactic acid production rate per bacterium        | $q$    | $\log_{10}[mol/h]$ | $-20$     | $-10$     | $-15$     |

> \* A fermentation window of roughly 12 hours is representative, but you should 
> choose a duration that makes the dynamics legible for the user.

> \*\* Minimum and maximum values are typical ranges.

#### Outputs

| Definition                      | Formula                                                           | Unit        |
| ------------------------------- | ----------------------------------------------------------------- | ----------- |
| Bacterial concentration         | $X(t) = \int\_{t_0}^t\left(\mu\cdot{X}\cdot\sigma(pH)\right)dt' $ | $[cells/l]$ |
| Lactic acid concentration       | $p(t) = \int_{t_0}^t\left(10^q\cdot{X}\cdot\sigma(pH)\right)dt '$ | $[mol/l]$   |
| Potential of hydrogen (pH)      | $\mathrm{pH}(t)$ = $-\log_{10}p(t)$                               | $[mol/l]$   |
| Logistic inhibition term for pH | $\sigma(pH) = (1 + e^{-c_2(pH - c_1)})^{-1}$                      | $[mol/l]$   |


> $\sigma(pH)$ is a logistic inhibition term that switches the culture off as
> the medium acidifies.

> **Hint:** There are a number of ODE solvers widely available that will solve 
> the equations for you - please do not spend the time attempting to write your 
> own. An example of one is `odeint` / `solve_ivp` from `scipy`, but feel free 
> to do more research and pick one of the other options.

An attempt to solve the equation system is located at 
[manual-integration.md](manual-integration.md).

## Context of discovery

### Cream cheese production

* Cream cheese is made by inoculating a milk base with lactic acid bacteria
* The culture ferments under controlled conditions. 
* When bacteria grow, they produce lactic acid, which drops the pH.
* The pH trajectory over the fermentation window is the single most important 
quality signal on the line, it drives:
  * texture
  * flavour development
  * shelf life
  * determines when the batch is ready to move to the next step.

### Stakeholders

* Process technicians
* Senior process experts 

### User stories

* Stakeholders want to develop intuition, by playing with the inputs of the 
model.
* Stakeholders want to compare different scenarios in parallel.
* Access to the model is not open, but they want to be able to play with it. 