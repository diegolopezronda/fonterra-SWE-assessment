# Cream Cheese Fermentation Explorer

An open brief. The shape of the solution is yours to decide.


## The setting

Cream cheese is made by inoculating a milk base with lactic acid bacteria and letting the culture ferment under controlled conditions. As the bacteria grow they produce lactic acid, which drops the pH. The pH trajectory over the fermentation window is the single most important quality signal on the line - it drives texture, flavour development, and shelf life, and it determines when the batch is ready to move to the next step.

Process technicians and the more senior process experts on the cream cheese line spend a lot of time reasoning about this trajectory. They want to develop intuition for questions like:

- "If the starter culture comes in a bit weaker than spec today, how much does that shift the curve?"
- "What does a small change in growth rate do to the time we hit our target pH?"
- "If two batches drift in different directions, what's the most likely cause?"
- "What's the range of results we could expect under out normal operating conditions?"

Right now they don't have a good way to play with these scenarios. The modelling team has a set of ODEs that describe the fermentation reasonably well, but the ODEs live in a notebook on one engineer's laptop and nobody else can touch them.

The team has asked you to build something better. *What that "something" is, is up to you.*

## The model

The fermentation is described by two coupled ODEs. Let:

- $X(t)$ - bacterial concentration, in cells per litre $[1/L]$
- $p(t)$ - lactic acid concentration, in moles per litre $[mol/L]$
- $\mathrm{pH}(t) = -\log_{10} p(t)$

Then:

dX/dt = mu * X * sigma(pH)
dp/dt = (10^q) * X * sigma(pH)

where sigma(pH) is a logistic inhibition term that switches the culture off as the medium acidifies:

sigma(pH) = 1 / (1 + exp(-c2 * (pH - c1)))

with constants c1 = 5 and c2 = 12.

The four inputs the operators care about are:

| Symbol | Meaning | Typical range | Sensible Default |
| --- | --- | --- | --- |
| mu | Bacterial growth rate $[1/\mathrm{hr}]$ | 0.1 – 2 | 1 |
| q  | log₁₀ of lactic-acid production rate per bacterium $[\log_{10}(\mathrm{mol/hr})]$ | -20 to -10 | -15 |
| X0 | Initial bacterial concentration $[1/L]$ | $10^4$ – $10^8$ | $10^6$ |
| p0 | Initial lactic acid concentration $[\mathrm{mol/L}]$ | $10^{-8}$ – $10^{-4}$ |

A fermentation window of roughly 12 hours is representative, but you should choose a duration that makes the dynamics legible for the user.



## What we're asking for

Build a prototype that lets a process expert explore the model and develop intuition.

The brief is intentionally loose. We want to see how you think about both the *experience* and the *system*. Some prompts to push your thinking - you don't need to answer all of them, but the best submissions show evidence of having considered them:

*For the user*
- Who exactly is using this - a curious technician on shift, a senior process expert tuning a recipe, a trainer onboarding new hires? They want different things.
- What decision or question is the tool helping them with?
- What's the right level of interactivity vs. guidance? 

*For the system*
- How is the work split between solver, application logic, and presentation? Where does state live? What gets recomputed when?
- What are the performance characteristics that matter for the experience you're designing, and how do your choices honour them?
- How would this evolve if the modelling team handed you a second, more complex ODE next month? Are you boxed in?
- What are the boundaries of the system, and where does validation belong?


## Ground rules

- *Scope*: aim for roughly 3-4 hours of focused work. Use this to calibrate polish.
- *Stack*: your choice. Pick what lets you move quickly and lets the experience land.
- *AI tools*: Copilot, Claude, Cursor, ChatGPT, and similar are allowed and expected in order to provide fairness across candidates. We suggest using them for both the development work and to help you understand the context faster.
- *Submission*: push your work to a *private GitHub repository* and share it with the interviewers - `oleg-barbin-fonterra` and `priyankj123` at least one day before the second interview. A short gif, video, or sequence of screenshots embedded in the README showing the tool in use is greatly appreciated.

## Evaluation Criteria

1. *User experience & product judgment* - Does the tool actually help a process expert do something they couldn't easily do before? Has the interaction been designed, or have parameters just been exposed? Is the experience cohesive?
2. *System design* - Is there a sensible separation between the model/solver, application logic, and the interface? Do the architectural choices match the experience you're trying to deliver? Do your tradeoffs hold up when questioned?
3. *Technical execution* - Is the ODE solution numerically sound? Is the code readable and reasonably structured? Does the app run cleanly? Is validation and error-handling placed where it belongs?
4. *Communication* - Does the README explain who the tool is for, what design choices you made, what you deliberately left out, and how to run it? Could a teammate pick this up cold?

## Closing

Reach out if anything is unclear, and feel free to push back on assumptions. Have fun with it - looking forward to seeing what you build.
