import subprocess, sys, time

def run(cmd):
    subprocess.call(cmd, shell=True)
	
print()
	
print("\x1b[0;33mYou are using IchHackeNet's Auto Installer!\x1b[0m")
time.sleep(1)
print("\x1b[0;33mPlease press enter when you see the following message :\x1b[0m")
print("\x1b[0;33m'libssh2 prefix? [autodetect] :'\x1b[0m")
time.sleep(1)


run("apt update")

run("apt -y upgrade")

run("apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates apache2 dstat wget git screen")

print("\x1b[0;33mInstalled Basics!\x1b[0m")
time.sleep(1)

run("curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -")

run("apt -y install nodejs")

print("\x1b[0;33mInstalled NodeJS!\x1b[0m")
time.sleep(1)

run("git clone https://github.com/Afoid58164/5184345")

run("npm install cloudscraper")

print("\x1b[0;33mInstalled cloudscraper\x1b[0m")
time.sleep(1)

run("npm install request")

print("\x1b[0;33mInstalled request\x1b[0m")
time.sleep(1)

run("npm install zombie")

print("\x1b[0;33mInstalled zombie\x1b[0m")
time.sleep(1)

run("npm install colors")

print("\x1b[0;33mInstalled colors\x1b[0m")
time.sleep(1)

run("npm install chalk events request puppeteer puppeteer-extra puppeteer-extra-plugin-stealth random-useragent crypto-random-string minimist user-agents")

print("\x1b[0;33mInstalled other NPM's\x1b[0m")
time.sleep(1)

run("apt -y install php")

run("apt install -y chromium-browser")

run("apt -y install php-ssh")

run("apt -y install php-ssh2")

print("\x1b[0;33mInstalled PHP\x1b[0m")
time.sleep(1)

run("apt -y install python")

run("apt -y install python-pip")

run("apt -y install python3")

run("apt -y install python3-pip")

print("\x1b[0;33mInstalled Python\x1b[0m")
time.sleep(1)

print("\x1b[0;33mDone:)\x1b[0m")
time.sleep(1)

run("reboot")


exit(1)