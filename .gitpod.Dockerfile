FROM gitpod/workspace-mongodb

USER gitpod

RUN sudo apt-get update && \
  sudo apt-get install -y zsh
RUN brew install exa
RUN brew install bat
RUN brew install htop
RUN npm install -g npm-check-updates
RUN npm install -g parcel-bundler

RUN sudo chsh -s /usr/bin/zsh
RUN sudo usermod --shell /usr/bin/zsh gitpod

# RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

RUN sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" \
  && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
  && git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search \
  && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="cloud"/' ~/.zshrc
RUN sed -i 's/plugins=(git)/plugins=(git history-substring-search zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc
RUN echo "alias l='exa -lah'" >> ~/.zshrc
RUN echo "alias ll='exa -lh'" >> ~/.zshrc

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#

#
# More information: https://www.gitpod.io/docs/config-docker/
