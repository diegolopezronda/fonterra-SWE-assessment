import matplotlib.pyplot as plt
import pandas as pd


def plot(series: pd.DataFrame):
    colours = [
        "orange",
        "green",
        "red",
        "purple",
        "brown",
        "pink",
        "gray",
        "olive",
        "cyan",
    ]
    fig, ax1 = plt.subplots(figsize=(10, 8))
    ax1.set_xlabel(series.columns[0])
    ax1.plot(
        series[series.columns[0]],
        series[series.columns[1]],
        linewidth=2,
        label=series.columns[1],
        color="blue",
    )
    ax1.tick_params(axis="y")
    axs = []
    for i, column in enumerate(series.columns[2:]):
        color = colours[i % len(colours)]
        j = i + 2
        axs.append(ax1.twinx())
        linewidth = 3 - ((i + 1) % 2)
        spine = "right" if i % 2 == 0 else "left"
        linestyle = "--" if i % 2 == 0 else "-"
        spine_position = 40 * ((i + 1) // 2)
        axs[-1].plot(
            series[series.columns[0]],
            series[series.columns[j]],
            linewidth=linewidth,
            label=column,
            linestyle=linestyle,
            color=color,
        )
        axs[-1].tick_params(axis="y", labelcolor=color)
        axs[-1].spines[spine].set_position(("outward", spine_position))
        axs[-1].yaxis.set_label_position(spine)
        axs[-1].yaxis.set_ticks_position(spine)
    fig.legend()
    plt.show()
