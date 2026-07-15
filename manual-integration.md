# Manual integration

Given the system of equations:

$$
\begin{aligned}
\frac{dp}{dt} &= 10^q\cdot{X}\cdot\sigma(pH), \\
\frac{dX}{dt} &= \mu\cdot{X}\cdot\sigma(pH)
\end{aligned}
$$

then,

$$
\begin{aligned}
\frac{\frac{dp}{dt}}{\frac{dX}{dt}} &= \frac{10^q\cdot{X}\cdot\sigma(pH)}{\mu\cdot{X}\cdot\sigma(pH)} \\
\frac{dp}{dX} &= \frac{10^q}{\mu}\\
dp &= \frac{10^q}{\mu}{dX}\\
\int_{p_0}^{p} dp' &= \int_{X_0}^{X} \frac{10^q}{\mu} dX'\\
p(t) - p_0 &= \frac{10^q}{\mu} (X(t) - X_0) \\
\end{aligned}
$$

Therefore,

$$
p(t) = \frac{10^q}{\mu} (X(t) - X_0) + p_0
$$

Replacing around $X$:

$$
\begin{aligned}
pH(t) &= -\log_{10}p(t) \\
\equiv pH(X) &= -\log_{10}\left(\frac{10^q}{\mu} (X - X_0) + p_0\right)
\end{aligned}
$$

and

$$
\begin{aligned}
\sigma(pH) &= (1 + e^{-c_2(pH - c_1)})^{-1} \\
\sigma(X) &= \left(1 + e^{-c_2\left(-\log_{10}\left(\frac{10^q}{\mu} \left(X - X_0\right) + p_0\right)- c_1\right)}\right)^{-1} \\
\equiv \sigma(X) &= \frac{1}{1 + e^{-c_2\left(-\log_{10}\left(\frac{10^q}{\mu} \left(X - X_0\right) + p_0\right)- c_1\right)}} \\
\equiv \sigma(X) &= \frac{1}{1 + e^{\left(c_2\log_{10}\left(\frac{10^q}{\mu} \left(X - X_0\right) + p_0\right)+c_2c_1\right)}} \\
\equiv \sigma(X) &= \frac{1}{1 + e^{log_{10}\left(\left(\frac{10^q}{\mu} \left(X - X_0\right) + p_0\right)^{c_2}+c_2c_1\right)}} \\
\equiv \sigma(X) &= \frac{1}{1 + e^{log_{10}\left(\left(\frac{10^q}{\mu} \left(X - X_0\right) + p_0\right)^{c_2}\right)}\cdot e^{{c_2}{c_1}}} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  e^{
    \frac{
      \left(
        \ln
          \left(
            \frac{10^q}{\mu} \left(X - X_0\right) + p_0
          \right)^{c_2}
      \right)
    }{
      \ln(10)
    }
  }\cdot e^{{c_2}{c_1}}
} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  e^{
    \ln
      \left(
        \left(
          \frac{10^q}{\mu} \left(X - X_0\right) + p_0
        \right)^{c_2}
    \right)
     \frac{1}{\ln(10)}
  }\cdot e^{{c_2}{c_1}}
} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  e^{
    \ln
    \left(
      \left(
        \left(
          \frac{10^q}{\mu} \left(X - X_0\right) + p_0
        \right)^{c_2}
      \right)^{\frac{1}{\ln(10)}}
    \right)
  }\cdot e^{{c_2}{c_1}}
} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  {

      \left(
        \left(
          \frac{10^q}{\mu} \left(X - X_0\right) + p_0
        \right)^{c_2}
\right)^{\frac{1}{\ln(10)}}

  }\cdot e^{{c_2}{c_1}}
} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  {
        \left(
          \frac{10^q}{\mu} \left(X - X_0\right) + p_0
        \right)
^{\frac{c_2}{\ln(10)}}

  }\cdot e^{{c_2}{c_1}}
} \\
\equiv \sigma(X) &= \frac{1}{
  1 +
  e^{{c_2}{c_1}} \cdot
  {
        \left(
          \frac{10^q}{\mu} \left(X - X_0\right) + p_0
        \right)
^{\frac{c_2}{\ln(10)}}

  }
} \\

\end{aligned}
$$

finally,

$$
\begin{aligned}
\frac{dX}{dt} &= \mu\cdot{X}\cdot\sigma(X) \\
\frac{dX}{X\cdot\sigma(X)} &= \mu~{dt} \\
\int_{X_0}^{X} \frac{
  1 +
  e^{{c_2}{c_1}} \cdot
  {
        \left(
          \frac{10^q}{\mu} \left(X' - X_0\right) + p_0
        \right)
^{\frac{c_2}{\ln(10)}}

  }
}{
  X'
}dX' &= \int_{t_0}^{t}\mu~{dt'} \\
\int_{X_0}^{X} \frac{
  1 +
  e^{60} \cdot
  {
        \left(
          \frac{10^q}{\mu} \left(X' - X_0\right) + p_0
        \right)
^{5.21}

  }
}{
  X'
}dX' &= \mu{t} \\
\end{aligned}
$$