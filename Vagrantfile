OS_IMAGE = "debian/buster64"
CLASTAH_NAME = "clastah"
MASTAH_NUM = 1
MASTAH_CPU = 2
MASTAH_MEM = 2048
WORKAH_NUM = 1
WORKAH_CPU = 2
WORKAH_MEM = 2048
RUDE_IP = "192.168.56."
VAGRANT_DISABLE_VBOXSYMLINKCREATE=1

Vagrant.configure("2") do |config|
    config.vm.base_mac = nil
    config.vm.synced_folder ".", "/vagrant", disabled: false


    (1..MASTAH_NUM).each do |i|
        config.vm.define "mastah-#{i}" do |master|
            master.vm.box = OS_IMAGE
            master.vm.network "private_network", ip: "#{RUDE_IP}#{i + 10}"
            master.vm.hostname = "mastah-#{i}"
            master.vm.provider "virtualbox" do |v|
                v.memory = MASTAH_MEM
                v.cpus = MASTAH_CPU
            end
            master.vm.provision "ansible" do |ansible|
                ansible.playbook = "clastah.yml"
                ansible.extra_vars = {
                    clastah_name:       CLASTAH_NAME,
                    mastah_admin_user:  "vagrant",
                    mastah_admin_group: "vagrant",
                    mastah_apiserver_advertise_address: "#{RUDE_IP}#{i + 10}",
                    mastah_node_name: "mastah-#{i}",
                    clastah_public_ip: "#{RUDE_IP}#{i + 10}"
                }
                ansible.raw_arguments = [ "-D" ]
            end
        end
    end

    (1..WORKAH_NUM).each do |j|
        config.vm.define "workah-#{j}" do |node|
            node.vm.box = OS_IMAGE
            node.vm.network "private_network", ip: "#{RUDE_IP}#{j + 10 + MASTAH_NUM}"
            node.vm.hostname = "workah-#{j}"
            node.vm.provider "virtualbox" do |v|
                v.memory = WORKAH_MEM
                v.cpus = WORKAH_CPU
            end
            node.vm.provision "ansible" do |ansible|
                ansible.playbook = "clastah.yml"
                ansible.extra_vars = {
                    clastah_name:     CLASTAH_NAME,
                    workah_admin_user:  "vagrant",
                    workah_admin_group: "vagrant",
                    clastah_public_ip: "#{RUDE_IP}#{j + 10 + MASTAH_NUM}"
                }
                ansible.raw_arguments = [ "-D" ]

            end
        end
    end
end