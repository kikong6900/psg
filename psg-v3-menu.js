/* psg-v3-menu.js — PSG dropdown mega-menu (2026)
   Injects a category menu under the horizontal nav bar.
   No dependencies; load after psg-v3.css. */
(function () {
  'use strict';

  var MENU = [
    { name: 'Cloud', items: [
      ['docker.html', 'docker'], ['singularity.html', 'singularity'],
      ['vagrant.html', 'vagrant'], ['aws.html', 'AWS'],
      ['openstack.html', 'OpenStack'], ['warewulf.html', 'WareWulf']
    ]},
    { name: 'HPC', items: [
      ['bigdata.html', 'Big Data engines'], ['lsf.html', 'lsf, uge, slurm'],
      ['blogger_container_hpc.html', 'Container in HPC'], ['mpi.html', 'MPI, PVM'],
      ['sci-file.html', 'Science File Format'], ['sci-app.html', 'Sci-App']
    ]},
    { name: 'Unix', items: [
      ['nixos.html', 'NixOS'], ['coreos.html', 'CoreOS'],
      ['sol.html', 'Solaris'], ['linux.html', 'Linux'],
      ['hpux.html', 'HP-UX'], ['hpux.supl.html', 'HP-UX supplement'],
      ['aix.html', 'AIX'], ['aix_cd_catalog.html', 'AIX CD catalog'],
      ['irix.html', 'Irix'], ['dos.html', 'Windows'], ['apple.html', 'Apple Mac']
    ]},
    { name: 'Storage', items: [
      ['mrf.html', 'RFC 007 - MRF'], ['netapp.html', 'NetApp'],
      ['emc.html', 'EMC SAN - Clariion'], ['emcCelerra.html', 'EMC NAS - Celerra'],
      ['isilon.html', 'Isilon'], ['fs.html', 'Unix File System'],
      ['firewall.html', 'Linux Firewall/PAM'], ['fusionio.html', 'FusionIO SSD']
    ]},
    { name: 'Unix Dev', items: [
      ['gis.html', 'GIS'], ['devops.html', 'DevOps'],
      ['development.html', 'compilers, etc'], ['perl.html', 'Perl'],
      ['php.txt', 'PHP'], ['shellScript.txt', 'sh/bash, csh/tcsh'],
      ['awk.txt', 'AWK'], ['javascript.html', 'javascript'],
      ['gdb.html', 'gdb'], ['git.html', 'git'],
      ['sourceControl.html#svn', 'subversion'], ['sourceControl.html#cvs', 'cvs'],
      ['sourceControl.html#rcs', 'rcs'], ['sourceControl.html#hg', 'mercurial'],
      ['sourceControl.html#p4', 'perforce'],
      ['ssh.html', 'ssh'], ['vi.html', 'vi']
    ]},
    { name: 'Network', items: [
      ['infiniband.html', 'InfiniBand'], ['net.html', 'Network'],
      ['acopia.html', 'Acopia'], ['ipmi.html', 'IPMI'], ['ipv6.html', 'IPv6']
    ]},
    { name: 'Database', items: [
      ['mysql.html', 'MySQL'], ['sqlite.html', 'SQLite'],
      ['db2.html', 'DB2'], ['oracle.html', 'oracle']
    ]},
    { name: 'Other', items: [
      ['admin.html', 'General Unix Sys Admin'], ['general_unix.html', 'Generic Unix Commands'],
      ['ldap.html', 'LDAP'], ['softenv+modules.html', 'SoftEnv, Env Modules'],
      ['puppet.html', 'Puppet'], ['cfengine.html', 'CfEngine'],
      ['config_mgmt_comparison.html', 'Config Mgmt comparison'],
      ['factory_pw.html', 'factory password'], ['vnc.html', 'VNC, X Emulation'],
      ['backup.html', 'Unix backup'], ['postfix.html', 'Postfix'],
      ['veritas.html', 'Veritas'], ['legato.html', 'Legato Networker'],
      ['html.txt', 'HTML tags'], ['wiki.html', 'WiKi tags'],
      ['3rdParty', '3rd Party / Vendor Docs']
    ]},
    { name: 'Opinions', items: [
      ['netArch.html', 'Network Architecture'], ['monitor.html', 'Monitoring tools review'],
      ['docPlatform.html', 'Documentation platform']
    ]}
  ];

  function build() {
    var nav = document.createElement('nav');
    nav.className = 'psg-v3-menu';
    nav.setAttribute('aria-label', 'PSG sections');
    var ul = document.createElement('ul');

    MENU.forEach(function (cat) {
      var li = document.createElement('li');
      li.className = 'psg-v3-cat';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = cat.name;
      btn.setAttribute('aria-expanded', 'false');
      var drop = document.createElement('ul');
      drop.className = 'psg-v3-drop';
      cat.items.forEach(function (it) {
        var dli = document.createElement('li');
        var a = document.createElement('a');
        a.href = it[0];
        a.textContent = it[1];
        if (it[0].split('#')[0] === location.pathname.split('/').pop()) {
          a.className = 'here';
          li.classList.add('has-here');
        }
        dli.appendChild(a);
        drop.appendChild(dli);
      });
      li.appendChild(btn);
      li.appendChild(drop);
      ul.appendChild(li);
    });

    // Home link first
    var home = document.createElement('li');
    home.className = 'psg-v3-home';
    var ha = document.createElement('a');
    ha.href = 'psg2.html';
    ha.textContent = '⌂ Home';
    home.appendChild(ha);
    ul.insertBefore(home, ul.firstChild);

    nav.appendChild(ul);

    // auto-expand the category that contains the current page (non-hover context)
    var here = nav.querySelector('.has-here');
    if (here) {
      var hb = here.querySelector('button');
      if (hb) { here.classList.add('open'); hb.setAttribute('aria-expanded', 'true'); }
    }

    // insert under existing nav bar, or at top of body for pages without one
    var anchor = document.querySelector('.navheader');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(nav, anchor.nextSibling);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }

    // behavior: hover on desktop handled by CSS; click toggles for touch
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('.psg-v3-cat > button');
      if (!btn) return;
      e.preventDefault();
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // close others
      nav.querySelectorAll('.psg-v3-cat.open').forEach(function (o) {
        if (o !== li) { o.classList.remove('open'); o.querySelector('button').setAttribute('aria-expanded', 'false'); }
      });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        nav.querySelectorAll('.psg-v3-cat.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('button').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
