# Hello World!

Hey, welcome! This is a self-guided workshop introducing you to the magic of *fragment shaders*.

## How This Works

Each exercise in the workshop has a few parts. Here you'll find some background information that'll help you work through the task.

In the middle, you'll see a shader editor: your goal is to fix the shader as described in the code. You can see a preview on the left, both for your current answer and for the correct one. Once they match up, you'll pass the lesson.

Good luck!

## Wait, Shaders?

Most of the software we write and run — JavaScript, C#, Java, etc. — is executed on the computer's Central Processing Unit (CPU). This is your computer's brain, responsible for generic computation.

However there's another processing unit on your machine available to you: the Graphics Processing Unit (GPU). It's designed from the ground up to be *really* good at crunching numbers for computer graphics, and can do so much faster than your CPU. Its performance boost comes from the hardware. While a CPU has 2–8 big cores, a GPU has hundreds or even thousands of small ones. This makes it great at running code in *parallel*: provided a thread doesn't need to know anything about its neighbours, you can run a whole bunch of them really quickly at the same time without waiting for the others to finish.

This concept is perhaps better explained by Mythbusters' Adam Savage and Jamie Hyneman:

<iframe width="400" height="250" src="https://www.youtube.com/embed/-P28LKWTzrI" frameborder="0" allowfullscreen></iframe>

Shaders are the tiny programs that run on your GPU. There's a bunch of different types of shaders and shader languages with different purposes, but today we're looking at GLSL fragment shaders.

GLSL is the shader language used for WebGL, meaning we can run it here in the browser for you.

Fragment shaders are responsible for giving each pixel their colour. While they were originally intended simply for applying lighting effects to objects, they've since been pushed to their limits in communities such as [Shadertoy](https://www.shadertoy.com/). Take a look: all of the demos there are drawn completely in code. No assets to be seen! This is a popular technique in the demoscene for creating elaborate scenes with a small amount of code.

This one fits in 4 kilobytes:

<iframe width="400" height="250" src="https://www.youtube.com/embed/SFoyJED5A4s" frameborder="0" allowfullscreen></iframe>
