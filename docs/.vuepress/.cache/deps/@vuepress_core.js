import {
  ensureEndingSlash,
  ensureLeadingSlash,
  formatDateString,
  isLinkExternal,
  removeLeadingSlash,
  resolveLocalePath
} from "./chunk-MOAPKBNV.js";
import {
  isFunction,
  isString
} from "./chunk-ZLM2EG36.js";
import {
  require_assert,
  require_base64_js,
  require_browser,
  require_cli_spinners,
  require_dir_glob,
  require_fs,
  require_graceful_fs,
  require_hash_sum,
  require_ieee754,
  require_ignore,
  require_inherits_browser,
  require_jsonfile,
  require_merge2,
  require_onetime,
  require_out,
  require_path,
  require_readable_browser,
  require_signal_exit,
  require_universalify,
  require_util,
  require_utils,
  require_wcwidth
} from "./chunk-T3M3DZAK.js";
import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField,
  __require,
  __toESM
} from "./chunk-IZ3K76AJ.js";

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/fs/index.js
var require_fs2 = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/fs/index.js"(exports2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var fs4 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs4[key] === "function";
    });
    Object.assign(exports2, fs4);
    api.forEach((method) => {
      exports2[method] = u2(fs4[method]);
    });
    exports2.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs4.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs4.exists(filename, resolve);
      });
    };
    exports2.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs4.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs4.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports2.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs4.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs4.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    if (typeof fs4.writev === "function") {
      exports2.writev = function(fd, buffers, ...args) {
        if (typeof args[args.length - 1] === "function") {
          return fs4.writev(fd, buffers, ...args);
        }
        return new Promise((resolve, reject) => {
          fs4.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
            if (err)
              return reject(err);
            resolve({ bytesWritten, buffers: buffers2 });
          });
        });
      };
    }
    if (typeof fs4.realpath.native === "function") {
      exports2.realpath.native = u2(fs4.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/utils.js"(exports2, module2) {
    "use strict";
    var path4 = require_path();
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path4.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error2 = new Error(`Path contains invalid characters: ${pth}`);
          error2.code = "EINVAL";
          throw error2;
        }
      }
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports2, module2) {
    "use strict";
    var fs4 = require_fs2();
    var { checkPath } = require_utils2();
    var getMode = (options2) => {
      const defaults = { mode: 511 };
      if (typeof options2 === "number")
        return options2;
      return { ...defaults, ...options2 }.mode;
    };
    module2.exports.makeDir = async (dir, options2) => {
      checkPath(dir);
      return fs4.mkdir(dir, {
        mode: getMode(options2),
        recursive: true
      });
    };
    module2.exports.makeDirSync = (dir, options2) => {
      checkPath(dir);
      return fs4.mkdirSync(dir, {
        mode: getMode(options2),
        recursive: true
      });
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u2(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/path-exists/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs4 = require_fs2();
    function pathExists(path4) {
      return fs4.access(path4).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u2(pathExists),
      pathExistsSync: fs4.existsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/util/utimes.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    function utimesMillis(path4, atime, mtime, callback) {
      fs4.open(path4, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs4.futimes(fd, atime, mtime, (futimesErr) => {
          fs4.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path4, atime, mtime) {
      const fd = fs4.openSync(path4, "r+");
      fs4.futimesSync(fd, atime, mtime);
      return fs4.closeSync(fd);
    }
    module2.exports = {
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/util/stat.js"(exports2, module2) {
    "use strict";
    var fs4 = require_fs2();
    var path4 = require_path();
    var util = require_util();
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs4.stat(file, { bigint: true }) : (file) => fs4.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs4.statSync(file, { bigint: true }) : (file) => fs4.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, opts, cb) {
      util.callbackify(getStats)(src, dest, opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path4.basename(src);
            const destBaseName = path4.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true });
            }
            return cb(new Error("Source and destination must not be the same."));
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path4.basename(src);
          const destBaseName = path4.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path4.resolve(path4.dirname(src));
      const destParent = path4.resolve(path4.dirname(dest));
      if (destParent === srcParent || destParent === path4.parse(destParent).root)
        return cb();
      fs4.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT")
            return cb();
          return cb(err);
        }
        if (areIdentical(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path4.resolve(path4.dirname(src));
      const destParent = path4.resolve(path4.dirname(dest));
      if (destParent === srcParent || destParent === path4.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs4.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path4.resolve(src).split(path4.sep).filter((i2) => i2);
      const destArr = path4.resolve(dest).split(path4.sep).filter((i2) => i2);
      return srcArr.reduce((acc, cur, i2) => acc && destArr[i2] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var mkdirs = require_mkdirs().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimesMillis = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          if (opts.filter)
            return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
          return checkParentDir(destStat, src, dest, opts, cb);
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path4.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return getStats(destStat, src, dest, opts, cb);
        mkdirs(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return getStats(destStat, src, dest, opts, cb);
        });
      });
    }
    function handleFilter(onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then((include) => {
        if (include)
          return onInclude(destStat, src, dest, opts, cb);
        return cb();
      }, (error2) => cb(error2));
    }
    function startCopy(destStat, src, dest, opts, cb) {
      if (opts.filter)
        return handleFilter(getStats, destStat, src, dest, opts, cb);
      return getStats(destStat, src, dest, opts, cb);
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs4.stat : fs4.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
        else if (srcStat.isSocket())
          return cb(new Error(`Cannot copy a socket file: ${src}`));
        else if (srcStat.isFIFO())
          return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
        return cb(new Error(`Unknown file: ${src}`));
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs4.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      fs4.copyFile(src, dest, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps)
          return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
        return setDestMode(dest, srcStat.mode, cb);
      });
    }
    function handleTimestampsAndMode(srcMode, src, dest, cb) {
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, (err) => {
          if (err)
            return cb(err);
          return setDestTimestampsAndMode(srcMode, src, dest, cb);
        });
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 128, cb);
    }
    function setDestTimestampsAndMode(srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, (err) => {
        if (err)
          return cb(err);
        return setDestMode(dest, srcMode, cb);
      });
    }
    function setDestMode(dest, srcMode, cb) {
      return fs4.chmod(dest, srcMode, cb);
    }
    function setDestTimestamps(src, dest, cb) {
      fs4.stat(src, (err, updatedSrcStat) => {
        if (err)
          return cb(err);
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcMode, src, dest, opts, cb) {
      fs4.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return setDestMode(dest, srcMode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs4.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path4.join(src, item);
      const destItem = path4.join(dest, item);
      stat.checkPaths(srcItem, destItem, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, (err2) => {
          if (err2)
            return cb(err2);
          return copyDirItems(items, src, dest, opts, cb);
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs4.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path4.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs4.symlink(resolvedSrc, dest, cb);
        } else {
          fs4.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs4.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path4.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs4.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs4.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy-sync.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      return handleFilterAndCopy(destStat, src, dest, opts);
    }
    function handleFilterAndCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path4.dirname(dest);
      if (!fs4.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function startCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs4.statSync : fs4.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs4.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs4.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs4.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs4.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs4.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs4.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path4.join(src, item);
      const destItem = path4.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return startCopy(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs4.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path4.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs4.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs4.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs4.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path4.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (fs4.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs4.unlinkSync(dest);
      return fs4.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    module2.exports = {
      copy: u2(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/rimraf.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var assert = require_assert();
    var isWindows = process.platform === "win32";
    function defaults(options2) {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options2[m] = options2[m] || fs4[m];
        m = m + "Sync";
        options2[m] = options2[m] || fs4[m];
      });
      options2.maxBusyTries = options2.maxBusyTries || 3;
    }
    function rimraf(p, options2, cb) {
      let busyTries = 0;
      if (typeof options2 === "function") {
        cb = options2;
        options2 = {};
      }
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
      assert(options2, "rimraf: invalid options argument provided");
      assert.strictEqual(typeof options2, "object", "rimraf: options should be object");
      defaults(options2);
      rimraf_(p, options2, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options2.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            return setTimeout(() => rimraf_(p, options2, CB), time);
          }
          if (er.code === "ENOENT")
            er = null;
        }
        cb(er);
      });
    }
    function rimraf_(p, options2, cb) {
      assert(p);
      assert(options2);
      assert(typeof cb === "function");
      options2.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT") {
          return cb(null);
        }
        if (er && er.code === "EPERM" && isWindows) {
          return fixWinEPERM(p, options2, er, cb);
        }
        if (st && st.isDirectory()) {
          return rmdir(p, options2, er, cb);
        }
        options2.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT") {
              return cb(null);
            }
            if (er2.code === "EPERM") {
              return isWindows ? fixWinEPERM(p, options2, er2, cb) : rmdir(p, options2, er2, cb);
            }
            if (er2.code === "EISDIR") {
              return rmdir(p, options2, er2, cb);
            }
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options2, er, cb) {
      assert(p);
      assert(options2);
      assert(typeof cb === "function");
      options2.chmod(p, 438, (er2) => {
        if (er2) {
          cb(er2.code === "ENOENT" ? null : er);
        } else {
          options2.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === "ENOENT" ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options2, er, cb);
            } else {
              options2.unlink(p, cb);
            }
          });
        }
      });
    }
    function fixWinEPERMSync(p, options2, er) {
      let stats;
      assert(p);
      assert(options2);
      try {
        options2.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      try {
        stats = options2.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      if (stats.isDirectory()) {
        rmdirSync(p, options2, er);
      } else {
        options2.unlinkSync(p);
      }
    }
    function rmdir(p, options2, originalEr, cb) {
      assert(p);
      assert(options2);
      assert(typeof cb === "function");
      options2.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
          rmkids(p, options2, cb);
        } else if (er && er.code === "ENOTDIR") {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }
    function rmkids(p, options2, cb) {
      assert(p);
      assert(options2);
      assert(typeof cb === "function");
      options2.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n2 = files.length;
        let errState;
        if (n2 === 0)
          return options2.rmdir(p, cb);
        files.forEach((f2) => {
          rimraf(path4.join(p, f2), options2, (er2) => {
            if (errState) {
              return;
            }
            if (er2)
              return cb(errState = er2);
            if (--n2 === 0) {
              options2.rmdir(p, cb);
            }
          });
        });
      });
    }
    function rimrafSync(p, options2) {
      let st;
      options2 = options2 || {};
      defaults(options2);
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert(options2, "rimraf: missing options");
      assert.strictEqual(typeof options2, "object", "rimraf: options should be object");
      try {
        st = options2.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        }
        if (er.code === "EPERM" && isWindows) {
          fixWinEPERMSync(p, options2, er);
        }
      }
      try {
        if (st && st.isDirectory()) {
          rmdirSync(p, options2, null);
        } else {
          options2.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        } else if (er.code === "EPERM") {
          return isWindows ? fixWinEPERMSync(p, options2, er) : rmdirSync(p, options2, er);
        } else if (er.code !== "EISDIR") {
          throw er;
        }
        rmdirSync(p, options2, er);
      }
    }
    function rmdirSync(p, options2, originalEr) {
      assert(p);
      assert(options2);
      try {
        options2.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOTDIR") {
          throw originalEr;
        } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
          rmkidsSync(p, options2);
        } else if (er.code !== "ENOENT") {
          throw er;
        }
      }
    }
    function rmkidsSync(p, options2) {
      assert(p);
      assert(options2);
      options2.readdirSync(p).forEach((f2) => rimrafSync(path4.join(p, f2), options2));
      if (isWindows) {
        const startTime = Date.now();
        do {
          try {
            const ret = options2.rmdirSync(p, options2);
            return ret;
          } catch {
          }
        } while (Date.now() - startTime < 500);
      } else {
        const ret = options2.rmdirSync(p, options2);
        return ret;
      }
    }
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/index.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var u2 = require_universalify().fromCallback;
    var rimraf = require_rimraf();
    function remove(path4, callback) {
      if (fs4.rm)
        return fs4.rm(path4, { recursive: true, force: true }, callback);
      rimraf(path4, callback);
    }
    function removeSync(path4) {
      if (fs4.rmSync)
        return fs4.rmSync(path4, { recursive: true, force: true });
      rimraf.sync(path4);
    }
    module2.exports = {
      remove: u2(remove),
      removeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/empty/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs4 = require_fs2();
    var path4 = require_path();
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u2(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs4.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path4.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs4.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path4.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/file.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path4 = require_path();
    var fs4 = require_graceful_fs();
    var mkdir = require_mkdirs();
    function createFile(file, callback) {
      function makeFile() {
        fs4.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs4.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path4.dirname(file);
        fs4.stat(dir, (err2, stats2) => {
          if (err2) {
            if (err2.code === "ENOENT") {
              return mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeFile();
              });
            }
            return callback(err2);
          }
          if (stats2.isDirectory())
            makeFile();
          else {
            fs4.readdir(dir, (err3) => {
              if (err3)
                return callback(err3);
            });
          }
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs4.statSync(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path4.dirname(file);
      try {
        if (!fs4.statSync(dir).isDirectory()) {
          fs4.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs4.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u2(createFile),
      createFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/link.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path4 = require_path();
    var fs4 = require_graceful_fs();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs4.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs4.lstat(dstpath, (_, dstStat) => {
        fs4.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          if (dstStat && areIdentical(srcStat, dstStat))
            return callback(null);
          const dir = path4.dirname(dstpath);
          pathExists(dir, (err2, dirExists) => {
            if (err2)
              return callback(err2);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err3) => {
              if (err3)
                return callback(err3);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs4.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs4.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path4.dirname(dstpath);
      const dirExists = fs4.existsSync(dir);
      if (dirExists)
        return fs4.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs4.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u2(createLink),
      createLinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports2, module2) {
    "use strict";
    var path4 = require_path();
    var fs4 = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path4.isAbsolute(srcpath)) {
        return fs4.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          });
        });
      } else {
        const dstdir = path4.dirname(dstpath);
        const relativeToDst = path4.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            });
          } else {
            return fs4.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path4.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path4.isAbsolute(srcpath)) {
        exists = fs4.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      } else {
        const dstdir = path4.dirname(dstpath);
        const relativeToDst = path4.join(dstdir, srcpath);
        exists = fs4.existsSync(relativeToDst);
        if (exists) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          };
        } else {
          exists = fs4.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: path4.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs4.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs4.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path4 = require_path();
    var fs4 = require_fs2();
    var _mkdirs = require_mkdirs();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs4.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs4.stat(srcpath),
            fs4.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat))
              return callback(null);
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else
          _createSymlink(srcpath, dstpath, type, callback);
      });
    }
    function _createSymlink(srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err)
          return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err2, type2) => {
          if (err2)
            return callback(err2);
          const dir = path4.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return fs4.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              fs4.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs4.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs4.statSync(srcpath);
        const dstStat = fs4.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path4.dirname(dstpath);
      const exists = fs4.existsSync(dir);
      if (exists)
        return fs4.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs4.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u2(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/index.js"(exports2, module2) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module2.exports = {
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/jsonfile.js"(exports2, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/output-file/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path4.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs4.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs4.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path4.dirname(file);
      if (fs4.existsSync(dir)) {
        return fs4.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs4.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u2(outputFile),
      outputFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options2 = {}) {
      const str2 = stringify(data, options2);
      await outputFile(file, str2, options2);
    }
    module2.exports = outputJson;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json-sync.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options2) {
      const str2 = stringify(data, options2);
      outputFileSync(file, str2, options2);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/json/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u2(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          if (isParentRoot(dest))
            return doRename(src, dest, overwrite, isChangingCase, cb);
          mkdirp(path4.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, isChangingCase, cb);
          });
        });
      });
    }
    function isParentRoot(dest) {
      const parent = path4.dirname(dest);
      const parsedPath = path4.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase)
        return rename(src, dest, overwrite, cb);
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs4.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move-sync.js"(exports2, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require_path();
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path4.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path4.dirname(dest);
      const parsedPath = path4.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs4.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs4.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/move/index.js"(exports2, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    module2.exports = {
      move: u2(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      ...require_fs2(),
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});

// browser-external:node:fs
var require_node_fs = __commonJS({
  "browser-external:node:fs"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:fs" has been externalized for browser compatibility. Cannot access "node:fs.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:node:path
var require_node_path = __commonJS({
  "browser-external:node:path"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:path" has been externalized for browser compatibility. Cannot access "node:path.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:node:process
var require_node_process = __commonJS({
  "browser-external:node:process"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:process" has been externalized for browser compatibility. Cannot access "node:process.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:node:url
var require_node_url = __commonJS({
  "browser-external:node:url"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:url" has been externalized for browser compatibility. Cannot access "node:url.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:node:stream
var require_node_stream = __commonJS({
  "browser-external:node:stream"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:stream" has been externalized for browser compatibility. Cannot access "node:stream.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:node:readline
var require_node_readline = __commonJS({
  "browser-external:node:readline"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "node:readline" has been externalized for browser compatibility. Cannot access "node:readline.${key}" in client code.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(exports2) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto2 = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto2, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto2);
        return arr.foo() === 42;
      } catch (e2) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b2 = fromObject(value);
      if (b2)
        return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a2, b2) {
      if (isInstance(a2, Uint8Array))
        a2 = Buffer2.from(a2, a2.offset, a2.byteLength);
      if (isInstance(b2, Uint8Array))
        b2 = Buffer2.from(b2, b2.offset, b2.byteLength);
      if (!Buffer2.isBuffer(a2) || !Buffer2.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a2 === b2)
        return 0;
      let x = a2.length;
      let y = b2.length;
      for (let i2 = 0, len = Math.min(x, y); i2 < len; ++i2) {
        if (a2[i2] !== b2[i2]) {
          x = a2[i2];
          y = b2[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b2, n2, m) {
      const i2 = b2[n2];
      b2[n2] = b2[m];
      b2[m] = i2;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b2) {
      if (!Buffer2.isBuffer(b2))
        throw new TypeError("Argument must be a Buffer");
      if (this === b2)
        return true;
      return Buffer2.compare(this, b2) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str2 = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str2 = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str2 += " ... ";
      return "<Buffer " + str2 + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i3) {
        if (indexSize === 1) {
          return buf[i3];
        } else {
          return buf.readUInt16BE(i3 * indexSize);
        }
      }
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i2 + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i2;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i2;
        buf[offset + i2] = parsed;
      }
      return i2;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              fourthByte = buf[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i2 = byteLength2;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str2, range, input) {
        let msg = `The value of "${str2}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n2 = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
          } else {
            range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
          }
        } else {
          range = `>= ${min}${n2} and <= ${max}${n2}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str2) {
      str2 = str2.split("=")[0];
      str2 = str2.trim().replace(INVALID_BASE64_RE, "");
      if (str2.length < 2)
        return "";
      while (str2.length % 4 !== 0) {
        str2 = str2 + "=";
      }
      return str2;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str2) {
      const byteArray = [];
      for (let i2 = 0; i2 < str2.length; ++i2) {
        byteArray.push(str2.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str2, units) {
      let c2, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str2.length; ++i2) {
        if ((units -= 2) < 0)
          break;
        c2 = str2.charCodeAt(i2);
        hi = c2 >> 8;
        lo = c2 % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str2) {
      return base64.toByteArray(base64clean(str2));
    }
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length)
          break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/.pnpm/bl@5.1.0/node_modules/bl/BufferList.js
var require_BufferList = __commonJS({
  "node_modules/.pnpm/bl@5.1.0/node_modules/bl/BufferList.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var symbol = Symbol.for("BufferList");
    function BufferList(buf) {
      if (!(this instanceof BufferList)) {
        return new BufferList(buf);
      }
      BufferList._init.call(this, buf);
    }
    BufferList._init = function _init(buf) {
      Object.defineProperty(this, symbol, { value: true });
      this._bufs = [];
      this.length = 0;
      if (buf) {
        this.append(buf);
      }
    };
    BufferList.prototype._new = function _new(buf) {
      return new BufferList(buf);
    };
    BufferList.prototype._offset = function _offset(offset) {
      if (offset === 0) {
        return [0, 0];
      }
      let tot = 0;
      for (let i2 = 0; i2 < this._bufs.length; i2++) {
        const _t = tot + this._bufs[i2].length;
        if (offset < _t || i2 === this._bufs.length - 1) {
          return [i2, offset - tot];
        }
        tot = _t;
      }
    };
    BufferList.prototype._reverseOffset = function(blOffset) {
      const bufferId = blOffset[0];
      let offset = blOffset[1];
      for (let i2 = 0; i2 < bufferId; i2++) {
        offset += this._bufs[i2].length;
      }
      return offset;
    };
    BufferList.prototype.get = function get(index) {
      if (index > this.length || index < 0) {
        return void 0;
      }
      const offset = this._offset(index);
      return this._bufs[offset[0]][offset[1]];
    };
    BufferList.prototype.slice = function slice(start, end) {
      if (typeof start === "number" && start < 0) {
        start += this.length;
      }
      if (typeof end === "number" && end < 0) {
        end += this.length;
      }
      return this.copy(null, 0, start, end);
    };
    BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
      if (typeof srcStart !== "number" || srcStart < 0) {
        srcStart = 0;
      }
      if (typeof srcEnd !== "number" || srcEnd > this.length) {
        srcEnd = this.length;
      }
      if (srcStart >= this.length) {
        return dst || Buffer2.alloc(0);
      }
      if (srcEnd <= 0) {
        return dst || Buffer2.alloc(0);
      }
      const copy2 = !!dst;
      const off = this._offset(srcStart);
      const len = srcEnd - srcStart;
      let bytes = len;
      let bufoff = copy2 && dstStart || 0;
      let start = off[1];
      if (srcStart === 0 && srcEnd === this.length) {
        if (!copy2) {
          return this._bufs.length === 1 ? this._bufs[0] : Buffer2.concat(this._bufs, this.length);
        }
        for (let i2 = 0; i2 < this._bufs.length; i2++) {
          this._bufs[i2].copy(dst, bufoff);
          bufoff += this._bufs[i2].length;
        }
        return dst;
      }
      if (bytes <= this._bufs[off[0]].length - start) {
        return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
      }
      if (!copy2) {
        dst = Buffer2.allocUnsafe(len);
      }
      for (let i2 = off[0]; i2 < this._bufs.length; i2++) {
        const l2 = this._bufs[i2].length - start;
        if (bytes > l2) {
          this._bufs[i2].copy(dst, bufoff, start);
          bufoff += l2;
        } else {
          this._bufs[i2].copy(dst, bufoff, start, start + bytes);
          bufoff += l2;
          break;
        }
        bytes -= l2;
        if (start) {
          start = 0;
        }
      }
      if (dst.length > bufoff)
        return dst.slice(0, bufoff);
      return dst;
    };
    BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
      start = start || 0;
      end = typeof end !== "number" ? this.length : end;
      if (start < 0) {
        start += this.length;
      }
      if (end < 0) {
        end += this.length;
      }
      if (start === end) {
        return this._new();
      }
      const startOffset = this._offset(start);
      const endOffset = this._offset(end);
      const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
      if (endOffset[1] === 0) {
        buffers.pop();
      } else {
        buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
      }
      if (startOffset[1] !== 0) {
        buffers[0] = buffers[0].slice(startOffset[1]);
      }
      return this._new(buffers);
    };
    BufferList.prototype.toString = function toString(encoding, start, end) {
      return this.slice(start, end).toString(encoding);
    };
    BufferList.prototype.consume = function consume(bytes) {
      bytes = Math.trunc(bytes);
      if (Number.isNaN(bytes) || bytes <= 0)
        return this;
      while (this._bufs.length) {
        if (bytes >= this._bufs[0].length) {
          bytes -= this._bufs[0].length;
          this.length -= this._bufs[0].length;
          this._bufs.shift();
        } else {
          this._bufs[0] = this._bufs[0].slice(bytes);
          this.length -= bytes;
          break;
        }
      }
      return this;
    };
    BufferList.prototype.duplicate = function duplicate() {
      const copy = this._new();
      for (let i2 = 0; i2 < this._bufs.length; i2++) {
        copy.append(this._bufs[i2]);
      }
      return copy;
    };
    BufferList.prototype.append = function append(buf) {
      if (buf == null) {
        return this;
      }
      if (buf.buffer) {
        this._appendBuffer(Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength));
      } else if (Array.isArray(buf)) {
        for (let i2 = 0; i2 < buf.length; i2++) {
          this.append(buf[i2]);
        }
      } else if (this._isBufferList(buf)) {
        for (let i2 = 0; i2 < buf._bufs.length; i2++) {
          this.append(buf._bufs[i2]);
        }
      } else {
        if (typeof buf === "number") {
          buf = buf.toString();
        }
        this._appendBuffer(Buffer2.from(buf));
      }
      return this;
    };
    BufferList.prototype._appendBuffer = function appendBuffer(buf) {
      this._bufs.push(buf);
      this.length += buf.length;
    };
    BufferList.prototype.indexOf = function(search, offset, encoding) {
      if (encoding === void 0 && typeof offset === "string") {
        encoding = offset;
        offset = void 0;
      }
      if (typeof search === "function" || Array.isArray(search)) {
        throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
      } else if (typeof search === "number") {
        search = Buffer2.from([search]);
      } else if (typeof search === "string") {
        search = Buffer2.from(search, encoding);
      } else if (this._isBufferList(search)) {
        search = search.slice();
      } else if (Array.isArray(search.buffer)) {
        search = Buffer2.from(search.buffer, search.byteOffset, search.byteLength);
      } else if (!Buffer2.isBuffer(search)) {
        search = Buffer2.from(search);
      }
      offset = Number(offset || 0);
      if (isNaN(offset)) {
        offset = 0;
      }
      if (offset < 0) {
        offset = this.length + offset;
      }
      if (offset < 0) {
        offset = 0;
      }
      if (search.length === 0) {
        return offset > this.length ? this.length : offset;
      }
      const blOffset = this._offset(offset);
      let blIndex = blOffset[0];
      let buffOffset = blOffset[1];
      for (; blIndex < this._bufs.length; blIndex++) {
        const buff = this._bufs[blIndex];
        while (buffOffset < buff.length) {
          const availableWindow = buff.length - buffOffset;
          if (availableWindow >= search.length) {
            const nativeSearchResult = buff.indexOf(search, buffOffset);
            if (nativeSearchResult !== -1) {
              return this._reverseOffset([blIndex, nativeSearchResult]);
            }
            buffOffset = buff.length - search.length + 1;
          } else {
            const revOffset = this._reverseOffset([blIndex, buffOffset]);
            if (this._match(revOffset, search)) {
              return revOffset;
            }
            buffOffset++;
          }
        }
        buffOffset = 0;
      }
      return -1;
    };
    BufferList.prototype._match = function(offset, search) {
      if (this.length - offset < search.length) {
        return false;
      }
      for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
        if (this.get(offset + searchOffset) !== search[searchOffset]) {
          return false;
        }
      }
      return true;
    };
    (function() {
      const methods = {
        readDoubleBE: 8,
        readDoubleLE: 8,
        readFloatBE: 4,
        readFloatLE: 4,
        readInt32BE: 4,
        readInt32LE: 4,
        readUInt32BE: 4,
        readUInt32LE: 4,
        readInt16BE: 2,
        readInt16LE: 2,
        readUInt16BE: 2,
        readUInt16LE: 2,
        readInt8: 1,
        readUInt8: 1,
        readIntBE: null,
        readIntLE: null,
        readUIntBE: null,
        readUIntLE: null
      };
      for (const m in methods) {
        (function(m2) {
          if (methods[m2] === null) {
            BufferList.prototype[m2] = function(offset, byteLength) {
              return this.slice(offset, offset + byteLength)[m2](0, byteLength);
            };
          } else {
            BufferList.prototype[m2] = function(offset = 0) {
              return this.slice(offset, offset + methods[m2])[m2](0);
            };
          }
        })(m);
      }
    })();
    BufferList.prototype._isBufferList = function _isBufferList(b2) {
      return b2 instanceof BufferList || BufferList.isBufferList(b2);
    };
    BufferList.isBufferList = function isBufferList(b2) {
      return b2 != null && b2[symbol];
    };
    module2.exports = BufferList;
  }
});

// node_modules/.pnpm/bl@5.1.0/node_modules/bl/bl.js
var require_bl = __commonJS({
  "node_modules/.pnpm/bl@5.1.0/node_modules/bl/bl.js"(exports2, module2) {
    "use strict";
    var DuplexStream = require_readable_browser().Duplex;
    var inherits = require_inherits_browser();
    var BufferList = require_BufferList();
    function BufferListStream2(callback) {
      if (!(this instanceof BufferListStream2)) {
        return new BufferListStream2(callback);
      }
      if (typeof callback === "function") {
        this._callback = callback;
        const piper = function piper2(err) {
          if (this._callback) {
            this._callback(err);
            this._callback = null;
          }
        }.bind(this);
        this.on("pipe", function onPipe(src) {
          src.on("error", piper);
        });
        this.on("unpipe", function onUnpipe(src) {
          src.removeListener("error", piper);
        });
        callback = null;
      }
      BufferList._init.call(this, callback);
      DuplexStream.call(this);
    }
    inherits(BufferListStream2, DuplexStream);
    Object.assign(BufferListStream2.prototype, BufferList.prototype);
    BufferListStream2.prototype._new = function _new(callback) {
      return new BufferListStream2(callback);
    };
    BufferListStream2.prototype._write = function _write(buf, encoding, callback) {
      this._appendBuffer(buf);
      if (typeof callback === "function") {
        callback();
      }
    };
    BufferListStream2.prototype._read = function _read(size) {
      if (!this.length) {
        return this.push(null);
      }
      size = Math.min(size, this.length);
      this.push(this.slice(0, size));
      this.consume(size);
    };
    BufferListStream2.prototype.end = function end(chunk) {
      DuplexStream.prototype.end.call(this, chunk);
      if (this._callback) {
        this._callback(null, this.slice());
        this._callback = null;
      }
    };
    BufferListStream2.prototype._destroy = function _destroy(err, cb) {
      this._bufs.length = 0;
      this.length = 0;
      cb(err);
    };
    BufferListStream2.prototype._isBufferList = function _isBufferList(b2) {
      return b2 instanceof BufferListStream2 || b2 instanceof BufferList || BufferListStream2.isBufferList(b2);
    };
    BufferListStream2.isBufferList = BufferList.isBufferList;
    module2.exports = BufferListStream2;
    module2.exports.BufferListStream = BufferListStream2;
    module2.exports.BufferList = BufferList;
  }
});

// node_modules/.pnpm/upath@2.0.1/node_modules/upath/build/code/upath.js
var require_upath = __commonJS({
  "node_modules/.pnpm/upath@2.0.1/node_modules/upath/build/code/upath.js"(exports2) {
    var VERSION = "2.0.1";
    var extraFn;
    var extraFunctions;
    var isFunction2;
    var isString2;
    var isValidExt;
    var name;
    var path4;
    var propName;
    var propValue;
    var toUnix;
    var upath;
    var slice = [].slice;
    var indexOf = [].indexOf || function(item) {
      for (var i2 = 0, l2 = this.length; i2 < l2; i2++) {
        if (i2 in this && this[i2] === item)
          return i2;
      }
      return -1;
    };
    var hasProp = {}.hasOwnProperty;
    path4 = require_path();
    isFunction2 = function(val) {
      return typeof val === "function";
    };
    isString2 = function(val) {
      return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
    };
    upath = exports2;
    upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
    toUnix = function(p) {
      p = p.replace(/\\/g, "/");
      p = p.replace(new RegExp("(?<!^)\\/+", "g"), "/");
      return p;
    };
    for (propName in path4) {
      propValue = path4[propName];
      if (isFunction2(propValue)) {
        upath[propName] = function(propName2) {
          return function() {
            var args, result;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            args = args.map(function(p) {
              if (isString2(p)) {
                return toUnix(p);
              } else {
                return p;
              }
            });
            result = path4[propName2].apply(path4, args);
            if (isString2(result)) {
              return toUnix(result);
            } else {
              return result;
            }
          };
        }(propName);
      } else {
        upath[propName] = propValue;
      }
    }
    upath.sep = "/";
    extraFunctions = {
      toUnix,
      normalizeSafe: function(p) {
        var result;
        p = toUnix(p);
        result = upath.normalize(p);
        if (p.startsWith("./") && !result.startsWith("./") && !result.startsWith("..")) {
          result = "./" + result;
        } else if (p.startsWith("//") && !result.startsWith("//")) {
          if (p.startsWith("//./")) {
            result = "//." + result;
          } else {
            result = "/" + result;
          }
        }
        return result;
      },
      normalizeTrim: function(p) {
        p = upath.normalizeSafe(p);
        if (p.endsWith("/")) {
          return p.slice(0, +(p.length - 2) + 1 || 9e9);
        } else {
          return p;
        }
      },
      joinSafe: function() {
        var p, p0, result;
        p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        result = upath.join.apply(null, p);
        if (p.length > 0) {
          p0 = toUnix(p[0]);
          if (p0.startsWith("./") && !result.startsWith("./") && !result.startsWith("..")) {
            result = "./" + result;
          } else if (p0.startsWith("//") && !result.startsWith("//")) {
            if (p0.startsWith("//./")) {
              result = "//." + result;
            } else {
              result = "/" + result;
            }
          }
        }
        return result;
      },
      addExt: function(file, ext) {
        if (!ext) {
          return file;
        } else {
          if (ext[0] !== ".") {
            ext = "." + ext;
          }
          return file + (file.endsWith(ext) ? "" : ext);
        }
      },
      trimExt: function(filename, ignoreExts, maxSize) {
        var oldExt;
        if (maxSize == null) {
          maxSize = 7;
        }
        oldExt = upath.extname(filename);
        if (isValidExt(oldExt, ignoreExts, maxSize)) {
          return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9e9);
        } else {
          return filename;
        }
      },
      removeExt: function(filename, ext) {
        if (!ext) {
          return filename;
        } else {
          ext = ext[0] === "." ? ext : "." + ext;
          if (upath.extname(filename) === ext) {
            return upath.trimExt(filename, [], ext.length);
          } else {
            return filename;
          }
        }
      },
      changeExt: function(filename, ext, ignoreExts, maxSize) {
        if (maxSize == null) {
          maxSize = 7;
        }
        return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
      },
      defaultExt: function(filename, ext, ignoreExts, maxSize) {
        var oldExt;
        if (maxSize == null) {
          maxSize = 7;
        }
        oldExt = upath.extname(filename);
        if (isValidExt(oldExt, ignoreExts, maxSize)) {
          return filename;
        } else {
          return upath.addExt(filename, ext);
        }
      }
    };
    isValidExt = function(ext, ignoreExts, maxSize) {
      if (ignoreExts == null) {
        ignoreExts = [];
      }
      return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function(e2) {
        return (e2 && e2[0] !== "." ? "." : "") + e2;
      }), ext) < 0;
    };
    for (name in extraFunctions) {
      if (!hasProp.call(extraFunctions, name))
        continue;
      extraFn = extraFunctions[name];
      if (upath[name] !== void 0) {
        throw new Error("path." + name + " already exists.");
      } else {
        upath[name] = extraFn;
      }
    }
  }
});

// browser-external:url
var require_url = __commonJS({
  "browser-external:url"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code.`);
        }
      }
    }));
  }
});

// browser-external:process
var require_process = __commonJS({
  "browser-external:process"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "process" has been externalized for browser compatibility. Cannot access "process.${key}" in client code.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/entities@3.0.1/node_modules/entities/lib/maps/entities.json
var require_entities = __commonJS({
  "node_modules/.pnpm/entities@3.0.1/node_modules/entities/lib/maps/entities.json"(exports2, module2) {
    module2.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554", boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A", boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48", cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA", DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957", DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200", ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190", Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190", Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0", Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A", prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3", precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953", RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D", sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925", searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1", top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/entities.js
var require_entities2 = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/entities.js"(exports2, module2) {
    "use strict";
    module2.exports = require_entities();
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/P/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/P/regex.js"(exports2, module2) {
    module2.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
  }
});

// node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/encode.js
var require_encode = __commonJS({
  "node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/encode.js"(exports2, module2) {
    "use strict";
    var encodeCache = {};
    function getEncodeCache(exclude) {
      var i2, ch, cache = encodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = encodeCache[exclude] = [];
      for (i2 = 0; i2 < 128; i2++) {
        ch = String.fromCharCode(i2);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache.push(ch);
        } else {
          cache.push("%" + ("0" + i2.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (i2 = 0; i2 < exclude.length; i2++) {
        cache[exclude.charCodeAt(i2)] = exclude[i2];
      }
      return cache;
    }
    function encode(string, exclude, keepEscaped) {
      var i2, l2, code, nextCode, cache, result = "";
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      cache = getEncodeCache(exclude);
      for (i2 = 0, l2 = string.length; i2 < l2; i2++) {
        code = string.charCodeAt(i2);
        if (keepEscaped && code === 37 && i2 + 2 < l2) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i2 + 1, i2 + 3))) {
            result += string.slice(i2, i2 + 3);
            i2 += 2;
            continue;
          }
        }
        if (code < 128) {
          result += cache[code];
          continue;
        }
        if (code >= 55296 && code <= 57343) {
          if (code >= 55296 && code <= 56319 && i2 + 1 < l2) {
            nextCode = string.charCodeAt(i2 + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i2] + string[i2 + 1]);
              i2++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i2]);
      }
      return result;
    }
    encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode.componentChars = "-_.!~*'()";
    module2.exports = encode;
  }
});

// node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/decode.js
var require_decode = __commonJS({
  "node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/decode.js"(exports2, module2) {
    "use strict";
    var decodeCache = {};
    function getDecodeCache(exclude) {
      var i2, ch, cache = decodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = decodeCache[exclude] = [];
      for (i2 = 0; i2 < 128; i2++) {
        ch = String.fromCharCode(i2);
        cache.push(ch);
      }
      for (i2 = 0; i2 < exclude.length; i2++) {
        ch = exclude.charCodeAt(i2);
        cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
      }
      return cache;
    }
    function decode2(string, exclude) {
      var cache;
      if (typeof exclude !== "string") {
        exclude = decode2.defaultChars;
      }
      cache = getDecodeCache(exclude);
      return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
        var i2, l2, b1, b2, b3, b4, chr, result = "";
        for (i2 = 0, l2 = seq.length; i2 < l2; i2 += 3) {
          b1 = parseInt(seq.slice(i2 + 1, i2 + 3), 16);
          if (b1 < 128) {
            result += cache[b1];
            continue;
          }
          if ((b1 & 224) === 192 && i2 + 3 < l2) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            if ((b2 & 192) === 128) {
              chr = b1 << 6 & 1984 | b2 & 63;
              if (chr < 128) {
                result += "\uFFFD\uFFFD";
              } else {
                result += String.fromCharCode(chr);
              }
              i2 += 3;
              continue;
            }
          }
          if ((b1 & 240) === 224 && i2 + 6 < l2) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128) {
              chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
              if (chr < 2048 || chr >= 55296 && chr <= 57343) {
                result += "\uFFFD\uFFFD\uFFFD";
              } else {
                result += String.fromCharCode(chr);
              }
              i2 += 6;
              continue;
            }
          }
          if ((b1 & 248) === 240 && i2 + 9 < l2) {
            b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
            b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
            b4 = parseInt(seq.slice(i2 + 10, i2 + 12), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
              chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
              if (chr < 65536 || chr > 1114111) {
                result += "\uFFFD\uFFFD\uFFFD\uFFFD";
              } else {
                chr -= 65536;
                result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
              }
              i2 += 9;
              continue;
            }
          }
          result += "\uFFFD";
        }
        return result;
      });
    }
    decode2.defaultChars = ";/?:@&=+$,#";
    decode2.componentChars = "";
    module2.exports = decode2;
  }
});

// node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/format.js
var require_format = __commonJS({
  "node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/format.js"(exports2, module2) {
    "use strict";
    module2.exports = function format(url) {
      var result = "";
      result += url.protocol || "";
      result += url.slashes ? "//" : "";
      result += url.auth ? url.auth + "@" : "";
      if (url.hostname && url.hostname.indexOf(":") !== -1) {
        result += "[" + url.hostname + "]";
      } else {
        result += url.hostname || "";
      }
      result += url.port ? ":" + url.port : "";
      result += url.pathname || "";
      result += url.search || "";
      result += url.hash || "";
      return result;
    };
  }
});

// node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/parse.js"(exports2, module2) {
    "use strict";
    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.pathname = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i;
    var portPattern = /:[0-9]*$/;
    var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    var autoEscape = ["'"].concat(unwise);
    var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    var hostEndingChars = ["/", "?", "#"];
    var hostnameMaxLen = 255;
    var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    var hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    };
    var slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    function urlParse(url, slashesDenoteHost) {
      if (url && url instanceof Url) {
        return url;
      }
      var u2 = new Url();
      u2.parse(url, slashesDenoteHost);
      return u2;
    }
    Url.prototype.parse = function(url, slashesDenoteHost) {
      var i2, l2, lowerProto, hec, slashes, rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
          }
          return this;
        }
      }
      var proto2 = protocolPattern.exec(rest);
      if (proto2) {
        proto2 = proto2[0];
        lowerProto = proto2.toLowerCase();
        this.protocol = proto2;
        rest = rest.substr(proto2.length);
      }
      if (slashesDenoteHost || proto2 || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto2 && hostlessProtocol[proto2])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto2] && (slashes || proto2 && !slashedProtocol[proto2])) {
        var hostEnd = -1;
        for (i2 = 0; i2 < hostEndingChars.length; i2++) {
          hec = rest.indexOf(hostEndingChars[i2]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        var auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = auth;
        }
        hostEnd = -1;
        for (i2 = 0; i2 < nonHostChars.length; i2++) {
          hec = rest.indexOf(nonHostChars[i2]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }
        if (rest[hostEnd - 1] === ":") {
          hostEnd--;
        }
        var host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost(host);
        this.hostname = this.hostname || "";
        var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (i2 = 0, l2 = hostparts.length; i2 < l2; i2++) {
            var part = hostparts[i2];
            if (!part) {
              continue;
            }
            if (!part.match(hostnamePartPattern)) {
              var newpart = "";
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  newpart += "x";
                } else {
                  newpart += part[j];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i2);
                var notHost = hostparts.slice(i2 + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        }
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        }
      }
      var hash2 = rest.indexOf("#");
      if (hash2 !== -1) {
        this.hash = rest.substr(hash2);
        rest = rest.slice(0, hash2);
      }
      var qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        rest = rest.slice(0, qm);
      }
      if (rest) {
        this.pathname = rest;
      }
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "";
      }
      return this;
    };
    Url.prototype.parseHost = function(host) {
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) {
        this.hostname = host;
      }
    };
    module2.exports = urlParse;
  }
});

// node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/index.js
var require_mdurl = __commonJS({
  "node_modules/.pnpm/mdurl@1.0.1/node_modules/mdurl/index.js"(exports2, module2) {
    "use strict";
    module2.exports.encode = require_encode();
    module2.exports.decode = require_decode();
    module2.exports.format = require_format();
    module2.exports.parse = require_parse();
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/properties/Any/regex.js
var require_regex2 = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/properties/Any/regex.js"(exports2, module2) {
    module2.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cc/regex.js
var require_regex3 = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cc/regex.js"(exports2, module2) {
    module2.exports = /[\0-\x1F\x7F-\x9F]/;
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cf/regex.js
var require_regex4 = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Cf/regex.js"(exports2, module2) {
    module2.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Z/regex.js
var require_regex5 = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/categories/Z/regex.js"(exports2, module2) {
    module2.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  }
});

// node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/index.js
var require_uc = __commonJS({
  "node_modules/.pnpm/uc.micro@1.0.6/node_modules/uc.micro/index.js"(exports2) {
    "use strict";
    exports2.Any = require_regex2();
    exports2.Cc = require_regex3();
    exports2.Cf = require_regex4();
    exports2.P = require_regex();
    exports2.Z = require_regex5();
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/utils.js"(exports2) {
    "use strict";
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString2(obj) {
      return _class(obj) === "[object String]";
    }
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function has(object, key) {
      return _hasOwnProperty.call(object, key);
    }
    function assign(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be object");
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function arrayReplaceAt(src, pos, newElements) {
      return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
    }
    function isValidEntityCode(c2) {
      if (c2 >= 55296 && c2 <= 57343) {
        return false;
      }
      if (c2 >= 64976 && c2 <= 65007) {
        return false;
      }
      if ((c2 & 65535) === 65535 || (c2 & 65535) === 65534) {
        return false;
      }
      if (c2 >= 0 && c2 <= 8) {
        return false;
      }
      if (c2 === 11) {
        return false;
      }
      if (c2 >= 14 && c2 <= 31) {
        return false;
      }
      if (c2 >= 127 && c2 <= 159) {
        return false;
      }
      if (c2 > 1114111) {
        return false;
      }
      return true;
    }
    function fromCodePoint(c2) {
      if (c2 > 65535) {
        c2 -= 65536;
        var surrogate1 = 55296 + (c2 >> 10), surrogate2 = 56320 + (c2 & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      }
      return String.fromCharCode(c2);
    }
    var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
    var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
    var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
    var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
    var entities = require_entities2();
    function replaceEntityPattern(match, name) {
      var code = 0;
      if (has(entities, name)) {
        return entities[name];
      }
      if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
        code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        if (isValidEntityCode(code)) {
          return fromCodePoint(code);
        }
      }
      return match;
    }
    function unescapeMd(str2) {
      if (str2.indexOf("\\") < 0) {
        return str2;
      }
      return str2.replace(UNESCAPE_MD_RE, "$1");
    }
    function unescapeAll(str2) {
      if (str2.indexOf("\\") < 0 && str2.indexOf("&") < 0) {
        return str2;
      }
      return str2.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
        if (escaped) {
          return escaped;
        }
        return replaceEntityPattern(match, entity);
      });
    }
    var HTML_ESCAPE_TEST_RE = /[&<>"]/;
    var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
    var HTML_REPLACEMENTS = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function replaceUnsafeChar(ch) {
      return HTML_REPLACEMENTS[ch];
    }
    function escapeHtml(str2) {
      if (HTML_ESCAPE_TEST_RE.test(str2)) {
        return str2.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
      }
      return str2;
    }
    var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
    function escapeRE(str2) {
      return str2.replace(REGEXP_ESCAPE_RE, "\\$&");
    }
    function isSpace(code) {
      switch (code) {
        case 9:
        case 32:
          return true;
      }
      return false;
    }
    function isWhiteSpace(code) {
      if (code >= 8192 && code <= 8202) {
        return true;
      }
      switch (code) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return true;
      }
      return false;
    }
    var UNICODE_PUNCT_RE = require_regex();
    function isPunctChar(ch) {
      return UNICODE_PUNCT_RE.test(ch);
    }
    function isMdAsciiPunct(ch) {
      switch (ch) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    function normalizeReference(str2) {
      str2 = str2.trim().replace(/\s+/g, " ");
      if ("\u1E9E".toLowerCase() === "\u1E7E") {
        str2 = str2.replace(/ẞ/g, "\xDF");
      }
      return str2.toLowerCase().toUpperCase();
    }
    exports2.lib = {};
    exports2.lib.mdurl = require_mdurl();
    exports2.lib.ucmicro = require_uc();
    exports2.assign = assign;
    exports2.isString = isString2;
    exports2.has = has;
    exports2.unescapeMd = unescapeMd;
    exports2.unescapeAll = unescapeAll;
    exports2.isValidEntityCode = isValidEntityCode;
    exports2.fromCodePoint = fromCodePoint;
    exports2.escapeHtml = escapeHtml;
    exports2.arrayReplaceAt = arrayReplaceAt;
    exports2.isSpace = isSpace;
    exports2.isWhiteSpace = isWhiteSpace;
    exports2.isMdAsciiPunct = isMdAsciiPunct;
    exports2.isPunctChar = isPunctChar;
    exports2.escapeRE = escapeRE;
    exports2.normalizeReference = normalizeReference;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_label.js
var require_parse_link_label = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_label.js"(exports2, module2) {
    "use strict";
    module2.exports = function parseLinkLabel(state, start, disableNested) {
      var level, found, marker, prevPos, labelEnd = -1, max = state.posMax, oldPos = state.pos;
      state.pos = start + 1;
      level = 1;
      while (state.pos < max) {
        marker = state.src.charCodeAt(state.pos);
        if (marker === 93) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        prevPos = state.pos;
        state.md.inline.skipToken(state);
        if (marker === 91) {
          if (prevPos === state.pos - 1) {
            level++;
          } else if (disableNested) {
            state.pos = oldPos;
            return -1;
          }
        }
      }
      if (found) {
        labelEnd = state.pos;
      }
      state.pos = oldPos;
      return labelEnd;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_destination.js
var require_parse_link_destination = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_destination.js"(exports2, module2) {
    "use strict";
    var unescapeAll = require_utils3().unescapeAll;
    module2.exports = function parseLinkDestination(str2, pos, max) {
      var code, level, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (str2.charCodeAt(pos) === 60) {
        pos++;
        while (pos < max) {
          code = str2.charCodeAt(pos);
          if (code === 10) {
            return result;
          }
          if (code === 60) {
            return result;
          }
          if (code === 62) {
            result.pos = pos + 1;
            result.str = unescapeAll(str2.slice(start + 1, pos));
            result.ok = true;
            return result;
          }
          if (code === 92 && pos + 1 < max) {
            pos += 2;
            continue;
          }
          pos++;
        }
        return result;
      }
      level = 0;
      while (pos < max) {
        code = str2.charCodeAt(pos);
        if (code === 32) {
          break;
        }
        if (code < 32 || code === 127) {
          break;
        }
        if (code === 92 && pos + 1 < max) {
          if (str2.charCodeAt(pos + 1) === 32) {
            break;
          }
          pos += 2;
          continue;
        }
        if (code === 40) {
          level++;
          if (level > 32) {
            return result;
          }
        }
        if (code === 41) {
          if (level === 0) {
            break;
          }
          level--;
        }
        pos++;
      }
      if (start === pos) {
        return result;
      }
      if (level !== 0) {
        return result;
      }
      result.str = unescapeAll(str2.slice(start, pos));
      result.lines = lines;
      result.pos = pos;
      result.ok = true;
      return result;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_title.js
var require_parse_link_title = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/parse_link_title.js"(exports2, module2) {
    "use strict";
    var unescapeAll = require_utils3().unescapeAll;
    module2.exports = function parseLinkTitle(str2, pos, max) {
      var code, marker, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (pos >= max) {
        return result;
      }
      marker = str2.charCodeAt(pos);
      if (marker !== 34 && marker !== 39 && marker !== 40) {
        return result;
      }
      pos++;
      if (marker === 40) {
        marker = 41;
      }
      while (pos < max) {
        code = str2.charCodeAt(pos);
        if (code === marker) {
          result.pos = pos + 1;
          result.lines = lines;
          result.str = unescapeAll(str2.slice(start + 1, pos));
          result.ok = true;
          return result;
        } else if (code === 40 && marker === 41) {
          return result;
        } else if (code === 10) {
          lines++;
        } else if (code === 92 && pos + 1 < max) {
          pos++;
          if (str2.charCodeAt(pos) === 10) {
            lines++;
          }
        }
        pos++;
      }
      return result;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/helpers/index.js"(exports2) {
    "use strict";
    exports2.parseLinkLabel = require_parse_link_label();
    exports2.parseLinkDestination = require_parse_link_destination();
    exports2.parseLinkTitle = require_parse_link_title();
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/renderer.js
var require_renderer = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/renderer.js"(exports2, module2) {
    "use strict";
    var assign = require_utils3().assign;
    var unescapeAll = require_utils3().unescapeAll;
    var escapeHtml = require_utils3().escapeHtml;
    var default_rules = {};
    default_rules.code_inline = function(tokens, idx, options2, env, slf) {
      var token = tokens[idx];
      return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(tokens[idx].content) + "</code>";
    };
    default_rules.code_block = function(tokens, idx, options2, env, slf) {
      var token = tokens[idx];
      return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
    };
    default_rules.fence = function(tokens, idx, options2, env, slf) {
      var token = tokens[idx], info2 = token.info ? unescapeAll(token.info).trim() : "", langName = "", langAttrs = "", highlighted, i2, arr, tmpAttrs, tmpToken;
      if (info2) {
        arr = info2.split(/(\s+)/g);
        langName = arr[0];
        langAttrs = arr.slice(2).join("");
      }
      if (options2.highlight) {
        highlighted = options2.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
      } else {
        highlighted = escapeHtml(token.content);
      }
      if (highlighted.indexOf("<pre") === 0) {
        return highlighted + "\n";
      }
      if (info2) {
        i2 = token.attrIndex("class");
        tmpAttrs = token.attrs ? token.attrs.slice() : [];
        if (i2 < 0) {
          tmpAttrs.push(["class", options2.langPrefix + langName]);
        } else {
          tmpAttrs[i2] = tmpAttrs[i2].slice();
          tmpAttrs[i2][1] += " " + options2.langPrefix + langName;
        }
        tmpToken = {
          attrs: tmpAttrs
        };
        return "<pre><code" + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n";
      }
      return "<pre><code" + slf.renderAttrs(token) + ">" + highlighted + "</code></pre>\n";
    };
    default_rules.image = function(tokens, idx, options2, env, slf) {
      var token = tokens[idx];
      token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options2, env);
      return slf.renderToken(tokens, idx, options2);
    };
    default_rules.hardbreak = function(tokens, idx, options2) {
      return options2.xhtmlOut ? "<br />\n" : "<br>\n";
    };
    default_rules.softbreak = function(tokens, idx, options2) {
      return options2.breaks ? options2.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
    };
    default_rules.text = function(tokens, idx) {
      return escapeHtml(tokens[idx].content);
    };
    default_rules.html_block = function(tokens, idx) {
      return tokens[idx].content;
    };
    default_rules.html_inline = function(tokens, idx) {
      return tokens[idx].content;
    };
    function Renderer() {
      this.rules = assign({}, default_rules);
    }
    Renderer.prototype.renderAttrs = function renderAttrs(token) {
      var i2, l2, result;
      if (!token.attrs) {
        return "";
      }
      result = "";
      for (i2 = 0, l2 = token.attrs.length; i2 < l2; i2++) {
        result += " " + escapeHtml(token.attrs[i2][0]) + '="' + escapeHtml(token.attrs[i2][1]) + '"';
      }
      return result;
    };
    Renderer.prototype.renderToken = function renderToken(tokens, idx, options2) {
      var nextToken, result = "", needLf = false, token = tokens[idx];
      if (token.hidden) {
        return "";
      }
      if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
        result += "\n";
      }
      result += (token.nesting === -1 ? "</" : "<") + token.tag;
      result += this.renderAttrs(token);
      if (token.nesting === 0 && options2.xhtmlOut) {
        result += " /";
      }
      if (token.block) {
        needLf = true;
        if (token.nesting === 1) {
          if (idx + 1 < tokens.length) {
            nextToken = tokens[idx + 1];
            if (nextToken.type === "inline" || nextToken.hidden) {
              needLf = false;
            } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
              needLf = false;
            }
          }
        }
      }
      result += needLf ? ">\n" : ">";
      return result;
    };
    Renderer.prototype.renderInline = function(tokens, options2, env) {
      var type, result = "", rules = this.rules;
      for (var i2 = 0, len = tokens.length; i2 < len; i2++) {
        type = tokens[i2].type;
        if (typeof rules[type] !== "undefined") {
          result += rules[type](tokens, i2, options2, env, this);
        } else {
          result += this.renderToken(tokens, i2, options2);
        }
      }
      return result;
    };
    Renderer.prototype.renderInlineAsText = function(tokens, options2, env) {
      var result = "";
      for (var i2 = 0, len = tokens.length; i2 < len; i2++) {
        if (tokens[i2].type === "text") {
          result += tokens[i2].content;
        } else if (tokens[i2].type === "image") {
          result += this.renderInlineAsText(tokens[i2].children, options2, env);
        } else if (tokens[i2].type === "softbreak") {
          result += "\n";
        }
      }
      return result;
    };
    Renderer.prototype.render = function(tokens, options2, env) {
      var i2, len, type, result = "", rules = this.rules;
      for (i2 = 0, len = tokens.length; i2 < len; i2++) {
        type = tokens[i2].type;
        if (type === "inline") {
          result += this.renderInline(tokens[i2].children, options2, env);
        } else if (typeof rules[type] !== "undefined") {
          result += rules[tokens[i2].type](tokens, i2, options2, env, this);
        } else {
          result += this.renderToken(tokens, i2, options2, env);
        }
      }
      return result;
    };
    module2.exports = Renderer;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/ruler.js
var require_ruler = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/ruler.js"(exports2, module2) {
    "use strict";
    function Ruler() {
      this.__rules__ = [];
      this.__cache__ = null;
    }
    Ruler.prototype.__find__ = function(name) {
      for (var i2 = 0; i2 < this.__rules__.length; i2++) {
        if (this.__rules__[i2].name === name) {
          return i2;
        }
      }
      return -1;
    };
    Ruler.prototype.__compile__ = function() {
      var self = this;
      var chains = [""];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        rule.alt.forEach(function(altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });
      self.__cache__ = {};
      chains.forEach(function(chain) {
        self.__cache__[chain] = [];
        self.__rules__.forEach(function(rule) {
          if (!rule.enabled) {
            return;
          }
          if (chain && rule.alt.indexOf(chain) < 0) {
            return;
          }
          self.__cache__[chain].push(rule.fn);
        });
      });
    };
    Ruler.prototype.at = function(name, fn, options2) {
      var index = this.__find__(name);
      var opt = options2 || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + name);
      }
      this.__rules__[index].fn = fn;
      this.__rules__[index].alt = opt.alt || [];
      this.__cache__ = null;
    };
    Ruler.prototype.before = function(beforeName, ruleName, fn, options2) {
      var index = this.__find__(beforeName);
      var opt = options2 || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + beforeName);
      }
      this.__rules__.splice(index, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.after = function(afterName, ruleName, fn, options2) {
      var index = this.__find__(afterName);
      var opt = options2 || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + afterName);
      }
      this.__rules__.splice(index + 1, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.push = function(ruleName, fn, options2) {
      var opt = options2 || {};
      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.enable = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      var result = [];
      list.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = true;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      this.__rules__.forEach(function(rule) {
        rule.enabled = false;
      });
      this.enable(list, ignoreInvalid);
    };
    Ruler.prototype.disable = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      var result = [];
      list.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = false;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.getRules = function(chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }
      return this.__cache__[chainName] || [];
    };
    module2.exports = Ruler;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/normalize.js
var require_normalize = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/normalize.js"(exports2, module2) {
    "use strict";
    var NEWLINES_RE = /\r\n?|\n/g;
    var NULL_RE = /\0/g;
    module2.exports = function normalize(state) {
      var str2;
      str2 = state.src.replace(NEWLINES_RE, "\n");
      str2 = str2.replace(NULL_RE, "\uFFFD");
      state.src = str2;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/block.js
var require_block = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/block.js"(exports2, module2) {
    "use strict";
    module2.exports = function block(state) {
      var token;
      if (state.inlineMode) {
        token = new state.Token("inline", "", 0);
        token.content = state.src;
        token.map = [0, 1];
        token.children = [];
        state.tokens.push(token);
      } else {
        state.md.block.parse(state.src, state.md, state.env, state.tokens);
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/inline.js
var require_inline = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/inline.js"(exports2, module2) {
    "use strict";
    module2.exports = function inline(state) {
      var tokens = state.tokens, tok, i2, l2;
      for (i2 = 0, l2 = tokens.length; i2 < l2; i2++) {
        tok = tokens[i2];
        if (tok.type === "inline") {
          state.md.inline.parse(tok.content, state.md, state.env, tok.children);
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/linkify.js
var require_linkify = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/linkify.js"(exports2, module2) {
    "use strict";
    var arrayReplaceAt = require_utils3().arrayReplaceAt;
    function isLinkOpen(str2) {
      return /^<a[>\s]/i.test(str2);
    }
    function isLinkClose(str2) {
      return /^<\/a\s*>/i.test(str2);
    }
    module2.exports = function linkify(state) {
      var i2, j, l2, tokens, token, currentToken, nodes, ln, text, pos, lastPos, level, htmlLinkLevel, url, fullUrl, urlText, blockTokens = state.tokens, links;
      if (!state.md.options.linkify) {
        return;
      }
      for (j = 0, l2 = blockTokens.length; j < l2; j++) {
        if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
          continue;
        }
        tokens = blockTokens[j].children;
        htmlLinkLevel = 0;
        for (i2 = tokens.length - 1; i2 >= 0; i2--) {
          currentToken = tokens[i2];
          if (currentToken.type === "link_close") {
            i2--;
            while (tokens[i2].level !== currentToken.level && tokens[i2].type !== "link_open") {
              i2--;
            }
            continue;
          }
          if (currentToken.type === "html_inline") {
            if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
              htmlLinkLevel--;
            }
            if (isLinkClose(currentToken.content)) {
              htmlLinkLevel++;
            }
          }
          if (htmlLinkLevel > 0) {
            continue;
          }
          if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
            text = currentToken.content;
            links = state.md.linkify.match(text);
            nodes = [];
            level = currentToken.level;
            lastPos = 0;
            if (links.length > 0 && links[0].index === 0 && i2 > 0 && tokens[i2 - 1].type === "text_special") {
              links = links.slice(1);
            }
            for (ln = 0; ln < links.length; ln++) {
              url = links[ln].url;
              fullUrl = state.md.normalizeLink(url);
              if (!state.md.validateLink(fullUrl)) {
                continue;
              }
              urlText = links[ln].text;
              if (!links[ln].schema) {
                urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
              } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
                urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
              } else {
                urlText = state.md.normalizeLinkText(urlText);
              }
              pos = links[ln].index;
              if (pos > lastPos) {
                token = new state.Token("text", "", 0);
                token.content = text.slice(lastPos, pos);
                token.level = level;
                nodes.push(token);
              }
              token = new state.Token("link_open", "a", 1);
              token.attrs = [["href", fullUrl]];
              token.level = level++;
              token.markup = "linkify";
              token.info = "auto";
              nodes.push(token);
              token = new state.Token("text", "", 0);
              token.content = urlText;
              token.level = level;
              nodes.push(token);
              token = new state.Token("link_close", "a", -1);
              token.level = --level;
              token.markup = "linkify";
              token.info = "auto";
              nodes.push(token);
              lastPos = links[ln].lastIndex;
            }
            if (lastPos < text.length) {
              token = new state.Token("text", "", 0);
              token.content = text.slice(lastPos);
              token.level = level;
              nodes.push(token);
            }
            blockTokens[j].children = tokens = arrayReplaceAt(tokens, i2, nodes);
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/replacements.js
var require_replacements = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/replacements.js"(exports2, module2) {
    "use strict";
    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
    var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
    var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
    var SCOPED_ABBR = {
      c: "\xA9",
      r: "\xAE",
      tm: "\u2122"
    };
    function replaceFn(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    }
    function replace_scoped(inlineTokens) {
      var i2, token, inside_autolink = 0;
      for (i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
        token = inlineTokens[i2];
        if (token.type === "text" && !inside_autolink) {
          token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    function replace_rare(inlineTokens) {
      var i2, token, inside_autolink = 0;
      for (i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
        token = inlineTokens[i2];
        if (token.type === "text" && !inside_autolink) {
          if (RARE_RE.test(token.content)) {
            token.content = token.content.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1\u2014").replace(/(^|\s)--(?=\s|$)/mg, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1\u2013");
          }
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    module2.exports = function replace(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
          replace_scoped(state.tokens[blkIdx].children);
        }
        if (RARE_RE.test(state.tokens[blkIdx].content)) {
          replace_rare(state.tokens[blkIdx].children);
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/smartquotes.js
var require_smartquotes = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/smartquotes.js"(exports2, module2) {
    "use strict";
    var isWhiteSpace = require_utils3().isWhiteSpace;
    var isPunctChar = require_utils3().isPunctChar;
    var isMdAsciiPunct = require_utils3().isMdAsciiPunct;
    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var APOSTROPHE = "\u2019";
    function replaceAt(str2, index, ch) {
      return str2.slice(0, index) + ch + str2.slice(index + 1);
    }
    function process_inlines(tokens, state) {
      var i2, token, text, t2, pos, max, thisLevel, item, lastChar, nextChar, isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace, canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;
      stack = [];
      for (i2 = 0; i2 < tokens.length; i2++) {
        token = tokens[i2];
        thisLevel = tokens[i2].level;
        for (j = stack.length - 1; j >= 0; j--) {
          if (stack[j].level <= thisLevel) {
            break;
          }
        }
        stack.length = j + 1;
        if (token.type !== "text") {
          continue;
        }
        text = token.content;
        pos = 0;
        max = text.length;
        OUTER:
          while (pos < max) {
            QUOTE_RE.lastIndex = pos;
            t2 = QUOTE_RE.exec(text);
            if (!t2) {
              break;
            }
            canOpen = canClose = true;
            pos = t2.index + 1;
            isSingle = t2[0] === "'";
            lastChar = 32;
            if (t2.index - 1 >= 0) {
              lastChar = text.charCodeAt(t2.index - 1);
            } else {
              for (j = i2 - 1; j >= 0; j--) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
                  break;
                if (!tokens[j].content)
                  continue;
                lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
                break;
              }
            }
            nextChar = 32;
            if (pos < max) {
              nextChar = text.charCodeAt(pos);
            } else {
              for (j = i2 + 1; j < tokens.length; j++) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
                  break;
                if (!tokens[j].content)
                  continue;
                nextChar = tokens[j].content.charCodeAt(0);
                break;
              }
            }
            isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
            isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
            isLastWhiteSpace = isWhiteSpace(lastChar);
            isNextWhiteSpace = isWhiteSpace(nextChar);
            if (isNextWhiteSpace) {
              canOpen = false;
            } else if (isNextPunctChar) {
              if (!(isLastWhiteSpace || isLastPunctChar)) {
                canOpen = false;
              }
            }
            if (isLastWhiteSpace) {
              canClose = false;
            } else if (isLastPunctChar) {
              if (!(isNextWhiteSpace || isNextPunctChar)) {
                canClose = false;
              }
            }
            if (nextChar === 34 && t2[0] === '"') {
              if (lastChar >= 48 && lastChar <= 57) {
                canClose = canOpen = false;
              }
            }
            if (canOpen && canClose) {
              canOpen = isLastPunctChar;
              canClose = isNextPunctChar;
            }
            if (!canOpen && !canClose) {
              if (isSingle) {
                token.content = replaceAt(token.content, t2.index, APOSTROPHE);
              }
              continue;
            }
            if (canClose) {
              for (j = stack.length - 1; j >= 0; j--) {
                item = stack[j];
                if (stack[j].level < thisLevel) {
                  break;
                }
                if (item.single === isSingle && stack[j].level === thisLevel) {
                  item = stack[j];
                  if (isSingle) {
                    openQuote = state.md.options.quotes[2];
                    closeQuote = state.md.options.quotes[3];
                  } else {
                    openQuote = state.md.options.quotes[0];
                    closeQuote = state.md.options.quotes[1];
                  }
                  token.content = replaceAt(token.content, t2.index, closeQuote);
                  tokens[item.token].content = replaceAt(
                    tokens[item.token].content,
                    item.pos,
                    openQuote
                  );
                  pos += closeQuote.length - 1;
                  if (item.token === i2) {
                    pos += openQuote.length - 1;
                  }
                  text = token.content;
                  max = text.length;
                  stack.length = j;
                  continue OUTER;
                }
              }
            }
            if (canOpen) {
              stack.push({
                token: i2,
                pos: t2.index,
                single: isSingle,
                level: thisLevel
              });
            } else if (canClose && isSingle) {
              token.content = replaceAt(token.content, t2.index, APOSTROPHE);
            }
          }
      }
    }
    module2.exports = function smartquotes(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
          continue;
        }
        process_inlines(state.tokens[blkIdx].children, state);
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/text_join.js
var require_text_join = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/text_join.js"(exports2, module2) {
    "use strict";
    module2.exports = function text_join(state) {
      var j, l2, tokens, curr, max, last, blockTokens = state.tokens;
      for (j = 0, l2 = blockTokens.length; j < l2; j++) {
        if (blockTokens[j].type !== "inline")
          continue;
        tokens = blockTokens[j].children;
        max = tokens.length;
        for (curr = 0; curr < max; curr++) {
          if (tokens[curr].type === "text_special") {
            tokens[curr].type = "text";
          }
        }
        for (curr = last = 0; curr < max; curr++) {
          if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
            tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
          } else {
            if (curr !== last) {
              tokens[last] = tokens[curr];
            }
            last++;
          }
        }
        if (curr !== last) {
          tokens.length = last;
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/token.js
var require_token = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/token.js"(exports2, module2) {
    "use strict";
    function Token(type, tag, nesting) {
      this.type = type;
      this.tag = tag;
      this.attrs = null;
      this.map = null;
      this.nesting = nesting;
      this.level = 0;
      this.children = null;
      this.content = "";
      this.markup = "";
      this.info = "";
      this.meta = null;
      this.block = false;
      this.hidden = false;
    }
    Token.prototype.attrIndex = function attrIndex(name) {
      var attrs, i2, len;
      if (!this.attrs) {
        return -1;
      }
      attrs = this.attrs;
      for (i2 = 0, len = attrs.length; i2 < len; i2++) {
        if (attrs[i2][0] === name) {
          return i2;
        }
      }
      return -1;
    };
    Token.prototype.attrPush = function attrPush(attrData) {
      if (this.attrs) {
        this.attrs.push(attrData);
      } else {
        this.attrs = [attrData];
      }
    };
    Token.prototype.attrSet = function attrSet(name, value) {
      var idx = this.attrIndex(name), attrData = [name, value];
      if (idx < 0) {
        this.attrPush(attrData);
      } else {
        this.attrs[idx] = attrData;
      }
    };
    Token.prototype.attrGet = function attrGet(name) {
      var idx = this.attrIndex(name), value = null;
      if (idx >= 0) {
        value = this.attrs[idx][1];
      }
      return value;
    };
    Token.prototype.attrJoin = function attrJoin(name, value) {
      var idx = this.attrIndex(name);
      if (idx < 0) {
        this.attrPush([name, value]);
      } else {
        this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
      }
    };
    module2.exports = Token;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/state_core.js
var require_state_core = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_core/state_core.js"(exports2, module2) {
    "use strict";
    var Token = require_token();
    function StateCore(src, md, env) {
      this.src = src;
      this.env = env;
      this.tokens = [];
      this.inlineMode = false;
      this.md = md;
    }
    StateCore.prototype.Token = Token;
    module2.exports = StateCore;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_core.js
var require_parser_core = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_core.js"(exports2, module2) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      ["normalize", require_normalize()],
      ["block", require_block()],
      ["inline", require_inline()],
      ["linkify", require_linkify()],
      ["replacements", require_replacements()],
      ["smartquotes", require_smartquotes()],
      ["text_join", require_text_join()]
    ];
    function Core() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1]);
      }
    }
    Core.prototype.process = function(state) {
      var i2, l2, rules;
      rules = this.ruler.getRules("");
      for (i2 = 0, l2 = rules.length; i2 < l2; i2++) {
        rules[i2](state);
      }
    };
    Core.prototype.State = require_state_core();
    module2.exports = Core;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/table.js
var require_table = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/table.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    function getLine(state, line) {
      var pos = state.bMarks[line] + state.tShift[line], max = state.eMarks[line];
      return state.src.slice(pos, max);
    }
    function escapedSplit(str2) {
      var result = [], pos = 0, max = str2.length, ch, isEscaped = false, lastPos = 0, current = "";
      ch = str2.charCodeAt(pos);
      while (pos < max) {
        if (ch === 124) {
          if (!isEscaped) {
            result.push(current + str2.substring(lastPos, pos));
            current = "";
            lastPos = pos + 1;
          } else {
            current += str2.substring(lastPos, pos - 1);
            lastPos = pos;
          }
        }
        isEscaped = ch === 92;
        pos++;
        ch = str2.charCodeAt(pos);
      }
      result.push(current + str2.substring(lastPos));
      return result;
    }
    module2.exports = function table(state, startLine, endLine, silent) {
      var ch, lineText, pos, i2, l2, nextLine, columns, columnCount, token, aligns, t2, tableLines, tbodyLines, oldParentType, terminate, terminatorRules, firstCh, secondCh;
      if (startLine + 2 > endLine) {
        return false;
      }
      nextLine = startLine + 1;
      if (state.sCount[nextLine] < state.blkIndent) {
        return false;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        return false;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      firstCh = state.src.charCodeAt(pos++);
      if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
        return false;
      }
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      secondCh = state.src.charCodeAt(pos++);
      if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
        return false;
      }
      if (firstCh === 45 && isSpace(secondCh)) {
        return false;
      }
      while (pos < state.eMarks[nextLine]) {
        ch = state.src.charCodeAt(pos);
        if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
          return false;
        }
        pos++;
      }
      lineText = getLine(state, startLine + 1);
      columns = lineText.split("|");
      aligns = [];
      for (i2 = 0; i2 < columns.length; i2++) {
        t2 = columns[i2].trim();
        if (!t2) {
          if (i2 === 0 || i2 === columns.length - 1) {
            continue;
          } else {
            return false;
          }
        }
        if (!/^:?-+:?$/.test(t2)) {
          return false;
        }
        if (t2.charCodeAt(t2.length - 1) === 58) {
          aligns.push(t2.charCodeAt(0) === 58 ? "center" : "right");
        } else if (t2.charCodeAt(0) === 58) {
          aligns.push("left");
        } else {
          aligns.push("");
        }
      }
      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf("|") === -1) {
        return false;
      }
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === "")
        columns.shift();
      if (columns.length && columns[columns.length - 1] === "")
        columns.pop();
      columnCount = columns.length;
      if (columnCount === 0 || columnCount !== aligns.length) {
        return false;
      }
      if (silent) {
        return true;
      }
      oldParentType = state.parentType;
      state.parentType = "table";
      terminatorRules = state.md.block.ruler.getRules("blockquote");
      token = state.push("table_open", "table", 1);
      token.map = tableLines = [startLine, 0];
      token = state.push("thead_open", "thead", 1);
      token.map = [startLine, startLine + 1];
      token = state.push("tr_open", "tr", 1);
      token.map = [startLine, startLine + 1];
      for (i2 = 0; i2 < columns.length; i2++) {
        token = state.push("th_open", "th", 1);
        if (aligns[i2]) {
          token.attrs = [["style", "text-align:" + aligns[i2]]];
        }
        token = state.push("inline", "", 0);
        token.content = columns[i2].trim();
        token.children = [];
        token = state.push("th_close", "th", -1);
      }
      token = state.push("tr_close", "tr", -1);
      token = state.push("thead_close", "thead", -1);
      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        lineText = getLine(state, nextLine).trim();
        if (!lineText) {
          break;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          break;
        }
        columns = escapedSplit(lineText);
        if (columns.length && columns[0] === "")
          columns.shift();
        if (columns.length && columns[columns.length - 1] === "")
          columns.pop();
        if (nextLine === startLine + 2) {
          token = state.push("tbody_open", "tbody", 1);
          token.map = tbodyLines = [startLine + 2, 0];
        }
        token = state.push("tr_open", "tr", 1);
        token.map = [nextLine, nextLine + 1];
        for (i2 = 0; i2 < columnCount; i2++) {
          token = state.push("td_open", "td", 1);
          if (aligns[i2]) {
            token.attrs = [["style", "text-align:" + aligns[i2]]];
          }
          token = state.push("inline", "", 0);
          token.content = columns[i2] ? columns[i2].trim() : "";
          token.children = [];
          token = state.push("td_close", "td", -1);
        }
        token = state.push("tr_close", "tr", -1);
      }
      if (tbodyLines) {
        token = state.push("tbody_close", "tbody", -1);
        tbodyLines[1] = nextLine;
      }
      token = state.push("table_close", "table", -1);
      tableLines[1] = nextLine;
      state.parentType = oldParentType;
      state.line = nextLine;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/code.js
var require_code = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/code.js"(exports2, module2) {
    "use strict";
    module2.exports = function code(state, startLine, endLine) {
      var nextLine, last, token;
      if (state.sCount[startLine] - state.blkIndent < 4) {
        return false;
      }
      last = nextLine = startLine + 1;
      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }
      state.line = last;
      token = state.push("code_block", "code", 0);
      token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
      token.map = [startLine, state.line];
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/fence.js
var require_fence = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/fence.js"(exports2, module2) {
    "use strict";
    module2.exports = function fence(state, startLine, endLine, silent) {
      var marker, len, params, nextLine, mem, token, markup, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (pos + 3 > max) {
        return false;
      }
      marker = state.src.charCodeAt(pos);
      if (marker !== 126 && marker !== 96) {
        return false;
      }
      mem = pos;
      pos = state.skipChars(pos, marker);
      len = pos - mem;
      if (len < 3) {
        return false;
      }
      markup = state.src.slice(mem, pos);
      params = state.src.slice(pos, max);
      if (marker === 96) {
        if (params.indexOf(String.fromCharCode(marker)) >= 0) {
          return false;
        }
      }
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.src.charCodeAt(pos) !== marker) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        pos = state.skipChars(pos, marker);
        if (pos - mem < len) {
          continue;
        }
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        haveEndMarker = true;
        break;
      }
      len = state.sCount[startLine];
      state.line = nextLine + (haveEndMarker ? 1 : 0);
      token = state.push("fence", "code", 0);
      token.info = params;
      token.content = state.getLines(startLine + 1, nextLine, len, true);
      token.markup = markup;
      token.map = [startLine, state.line];
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/blockquote.js
var require_blockquote = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/blockquote.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    module2.exports = function blockquote(state, startLine, endLine, silent) {
      var adjustTab, ch, i2, initial, l2, lastLineEmpty, lines, nextLine, offset, oldBMarks, oldBSCount, oldIndent, oldParentType, oldSCount, oldTShift, spaceAfterMarker, terminate, terminatorRules, token, isOutdented, oldLineMax = state.lineMax, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos++) !== 62) {
        return false;
      }
      if (silent) {
        return true;
      }
      initial = offset = state.sCount[startLine] + 1;
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[startLine] + offset) % 4 === 3) {
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      oldBMarks = [state.bMarks[startLine]];
      state.bMarks[startLine] = pos;
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      oldBSCount = [state.bsCount[startLine]];
      state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);
      lastLineEmpty = pos >= max;
      oldSCount = [state.sCount[startLine]];
      state.sCount[startLine] = offset - initial;
      oldTShift = [state.tShift[startLine]];
      state.tShift[startLine] = pos - state.bMarks[startLine];
      terminatorRules = state.md.block.ruler.getRules("blockquote");
      oldParentType = state.parentType;
      state.parentType = "blockquote";
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        isOutdented = state.sCount[nextLine] < state.blkIndent;
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos >= max) {
          break;
        }
        if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
          initial = offset = state.sCount[nextLine] + 1;
          if (state.src.charCodeAt(pos) === 32) {
            pos++;
            initial++;
            offset++;
            adjustTab = false;
            spaceAfterMarker = true;
          } else if (state.src.charCodeAt(pos) === 9) {
            spaceAfterMarker = true;
            if ((state.bsCount[nextLine] + offset) % 4 === 3) {
              pos++;
              initial++;
              offset++;
              adjustTab = false;
            } else {
              adjustTab = true;
            }
          } else {
            spaceAfterMarker = false;
          }
          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;
          while (pos < max) {
            ch = state.src.charCodeAt(pos);
            if (isSpace(ch)) {
              if (ch === 9) {
                offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
              } else {
                offset++;
              }
            } else {
              break;
            }
            pos++;
          }
          lastLineEmpty = pos >= max;
          oldBSCount.push(state.bsCount[nextLine]);
          state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] = offset - initial;
          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }
        if (lastLineEmpty) {
          break;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          state.lineMax = nextLine;
          if (state.blkIndent !== 0) {
            oldBMarks.push(state.bMarks[nextLine]);
            oldBSCount.push(state.bsCount[nextLine]);
            oldTShift.push(state.tShift[nextLine]);
            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] -= state.blkIndent;
          }
          break;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = -1;
      }
      oldIndent = state.blkIndent;
      state.blkIndent = 0;
      token = state.push("blockquote_open", "blockquote", 1);
      token.markup = ">";
      token.map = lines = [startLine, 0];
      state.md.block.tokenize(state, startLine, nextLine);
      token = state.push("blockquote_close", "blockquote", -1);
      token.markup = ">";
      state.lineMax = oldLineMax;
      state.parentType = oldParentType;
      lines[1] = state.line;
      for (i2 = 0; i2 < oldTShift.length; i2++) {
        state.bMarks[i2 + startLine] = oldBMarks[i2];
        state.tShift[i2 + startLine] = oldTShift[i2];
        state.sCount[i2 + startLine] = oldSCount[i2];
        state.bsCount[i2 + startLine] = oldBSCount[i2];
      }
      state.blkIndent = oldIndent;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/hr.js
var require_hr = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/hr.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    module2.exports = function hr(state, startLine, endLine, silent) {
      var marker, cnt, ch, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 95) {
        return false;
      }
      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker && !isSpace(ch)) {
          return false;
        }
        if (ch === marker) {
          cnt++;
        }
      }
      if (cnt < 3) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.line = startLine + 1;
      token = state.push("hr", "hr", 0);
      token.map = [startLine, state.line];
      token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/list.js
var require_list = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/list.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    function skipBulletListMarker(state, startLine) {
      var marker, pos, max, ch;
      pos = state.bMarks[startLine] + state.tShift[startLine];
      max = state.eMarks[startLine];
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 43) {
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function skipOrderedListMarker(state, startLine) {
      var ch, start = state.bMarks[startLine] + state.tShift[startLine], pos = start, max = state.eMarks[startLine];
      if (pos + 1 >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch < 48 || ch > 57) {
        return -1;
      }
      for (; ; ) {
        if (pos >= max) {
          return -1;
        }
        ch = state.src.charCodeAt(pos++);
        if (ch >= 48 && ch <= 57) {
          if (pos - start >= 10) {
            return -1;
          }
          continue;
        }
        if (ch === 41 || ch === 46) {
          break;
        }
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function markTightParagraphs(state, idx) {
      var i2, l2, level = state.level + 2;
      for (i2 = idx + 2, l2 = state.tokens.length - 2; i2 < l2; i2++) {
        if (state.tokens[i2].level === level && state.tokens[i2].type === "paragraph_open") {
          state.tokens[i2 + 2].hidden = true;
          state.tokens[i2].hidden = true;
          i2 += 2;
        }
      }
    }
    module2.exports = function list(state, startLine, endLine, silent) {
      var ch, contentStart, i2, indent, indentAfterMarker, initial, isOrdered, itemLines, l2, listLines, listTokIdx, markerCharCode, markerValue, max, nextLine, offset, oldListIndent, oldParentType, oldSCount, oldTShift, oldTight, pos, posAfterMarker, prevEmptyEnd, start, terminate, terminatorRules, token, isTerminatingParagraph = false, tight = true;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.listIndent >= 0 && state.sCount[startLine] - state.listIndent >= 4 && state.sCount[startLine] < state.blkIndent) {
        return false;
      }
      if (silent && state.parentType === "paragraph") {
        if (state.sCount[startLine] >= state.blkIndent) {
          isTerminatingParagraph = true;
        }
      }
      if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
        isOrdered = true;
        start = state.bMarks[startLine] + state.tShift[startLine];
        markerValue = Number(state.src.slice(start, posAfterMarker - 1));
        if (isTerminatingParagraph && markerValue !== 1)
          return false;
      } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
        isOrdered = false;
      } else {
        return false;
      }
      if (isTerminatingParagraph) {
        if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine])
          return false;
      }
      markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
      if (silent) {
        return true;
      }
      listTokIdx = state.tokens.length;
      if (isOrdered) {
        token = state.push("ordered_list_open", "ol", 1);
        if (markerValue !== 1) {
          token.attrs = [["start", markerValue]];
        }
      } else {
        token = state.push("bullet_list_open", "ul", 1);
      }
      token.map = listLines = [startLine, 0];
      token.markup = String.fromCharCode(markerCharCode);
      nextLine = startLine;
      prevEmptyEnd = false;
      terminatorRules = state.md.block.ruler.getRules("list");
      oldParentType = state.parentType;
      state.parentType = "list";
      while (nextLine < endLine) {
        pos = posAfterMarker;
        max = state.eMarks[nextLine];
        initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);
        while (pos < max) {
          ch = state.src.charCodeAt(pos);
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine]) % 4;
          } else if (ch === 32) {
            offset++;
          } else {
            break;
          }
          pos++;
        }
        contentStart = pos;
        if (contentStart >= max) {
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = offset - initial;
        }
        if (indentAfterMarker > 4) {
          indentAfterMarker = 1;
        }
        indent = initial + indentAfterMarker;
        token = state.push("list_item_open", "li", 1);
        token.markup = String.fromCharCode(markerCharCode);
        token.map = itemLines = [startLine, 0];
        if (isOrdered) {
          token.info = state.src.slice(start, posAfterMarker - 1);
        }
        oldTight = state.tight;
        oldTShift = state.tShift[startLine];
        oldSCount = state.sCount[startLine];
        oldListIndent = state.listIndent;
        state.listIndent = state.blkIndent;
        state.blkIndent = indent;
        state.tight = true;
        state.tShift[startLine] = contentStart - state.bMarks[startLine];
        state.sCount[startLine] = offset;
        if (contentStart >= max && state.isEmpty(startLine + 1)) {
          state.line = Math.min(state.line + 2, endLine);
        } else {
          state.md.block.tokenize(state, startLine, endLine, true);
        }
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
        state.blkIndent = state.listIndent;
        state.listIndent = oldListIndent;
        state.tShift[startLine] = oldTShift;
        state.sCount[startLine] = oldSCount;
        state.tight = oldTight;
        token = state.push("list_item_close", "li", -1);
        token.markup = String.fromCharCode(markerCharCode);
        nextLine = startLine = state.line;
        itemLines[1] = nextLine;
        contentStart = state.bMarks[startLine];
        if (nextLine >= endLine) {
          break;
        }
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.sCount[startLine] - state.blkIndent >= 4) {
          break;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
          start = state.bMarks[nextLine] + state.tShift[nextLine];
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        }
        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
          break;
        }
      }
      if (isOrdered) {
        token = state.push("ordered_list_close", "ol", -1);
      } else {
        token = state.push("bullet_list_close", "ul", -1);
      }
      token.markup = String.fromCharCode(markerCharCode);
      listLines[1] = nextLine;
      state.line = nextLine;
      state.parentType = oldParentType;
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/reference.js
var require_reference = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/reference.js"(exports2, module2) {
    "use strict";
    var normalizeReference = require_utils3().normalizeReference;
    var isSpace = require_utils3().isSpace;
    module2.exports = function reference(state, startLine, _endLine, silent) {
      var ch, destEndPos, destEndLineNo, endLine, href, i2, l2, label, labelEnd, oldParentType, res, start, str2, terminate, terminatorRules, title, lines = 0, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine], nextLine = startLine + 1;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 91) {
        return false;
      }
      while (++pos < max) {
        if (state.src.charCodeAt(pos) === 93 && state.src.charCodeAt(pos - 1) !== 92) {
          if (pos + 1 === max) {
            return false;
          }
          if (state.src.charCodeAt(pos + 1) !== 58) {
            return false;
          }
          break;
        }
      }
      endLine = state.lineMax;
      terminatorRules = state.md.block.ruler.getRules("reference");
      oldParentType = state.parentType;
      state.parentType = "reference";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      str2 = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      max = str2.length;
      for (pos = 1; pos < max; pos++) {
        ch = str2.charCodeAt(pos);
        if (ch === 91) {
          return false;
        } else if (ch === 93) {
          labelEnd = pos;
          break;
        } else if (ch === 10) {
          lines++;
        } else if (ch === 92) {
          pos++;
          if (pos < max && str2.charCodeAt(pos) === 10) {
            lines++;
          }
        }
      }
      if (labelEnd < 0 || str2.charCodeAt(labelEnd + 1) !== 58) {
        return false;
      }
      for (pos = labelEnd + 2; pos < max; pos++) {
        ch = str2.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) {
        } else {
          break;
        }
      }
      res = state.md.helpers.parseLinkDestination(str2, pos, max);
      if (!res.ok) {
        return false;
      }
      href = state.md.normalizeLink(res.str);
      if (!state.md.validateLink(href)) {
        return false;
      }
      pos = res.pos;
      lines += res.lines;
      destEndPos = pos;
      destEndLineNo = lines;
      start = pos;
      for (; pos < max; pos++) {
        ch = str2.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) {
        } else {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(str2, pos, max);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        lines += res.lines;
      } else {
        title = "";
        pos = destEndPos;
        lines = destEndLineNo;
      }
      while (pos < max) {
        ch = str2.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
      if (pos < max && str2.charCodeAt(pos) !== 10) {
        if (title) {
          title = "";
          pos = destEndPos;
          lines = destEndLineNo;
          while (pos < max) {
            ch = str2.charCodeAt(pos);
            if (!isSpace(ch)) {
              break;
            }
            pos++;
          }
        }
      }
      if (pos < max && str2.charCodeAt(pos) !== 10) {
        return false;
      }
      label = normalizeReference(str2.slice(1, labelEnd));
      if (!label) {
        return false;
      }
      if (silent) {
        return true;
      }
      if (typeof state.env.references === "undefined") {
        state.env.references = {};
      }
      if (typeof state.env.references[label] === "undefined") {
        state.env.references[label] = { title, href };
      }
      state.parentType = oldParentType;
      state.line = startLine + lines + 1;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/html_blocks.js
var require_html_blocks = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/html_blocks.js"(exports2, module2) {
    "use strict";
    module2.exports = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "section",
      "source",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/html_re.js
var require_html_re = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/common/html_re.js"(exports2, module2) {
    "use strict";
    var attr_name2 = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
    var unquoted2 = "[^\"'=<>`\\x00-\\x20]+";
    var single_quoted2 = "'[^']*'";
    var double_quoted2 = '"[^"]*"';
    var attr_value2 = "(?:" + unquoted2 + "|" + single_quoted2 + "|" + double_quoted2 + ")";
    var attribute2 = "(?:\\s+" + attr_name2 + "(?:\\s*=\\s*" + attr_value2 + ")?)";
    var open_tag2 = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute2 + "*\\s*\\/?>";
    var close_tag2 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
    var comment2 = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
    var processing2 = "<[?][\\s\\S]*?[?]>";
    var declaration2 = "<![A-Z]+\\s+[^>]*>";
    var cdata2 = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
    var HTML_TAG_RE2 = new RegExp("^(?:" + open_tag2 + "|" + close_tag2 + "|" + comment2 + "|" + processing2 + "|" + declaration2 + "|" + cdata2 + ")");
    var HTML_OPEN_CLOSE_TAG_RE2 = new RegExp("^(?:" + open_tag2 + "|" + close_tag2 + ")");
    module2.exports.HTML_TAG_RE = HTML_TAG_RE2;
    module2.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE2;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/html_block.js
var require_html_block = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/html_block.js"(exports2, module2) {
    "use strict";
    var block_names = require_html_blocks();
    var HTML_OPEN_CLOSE_TAG_RE2 = require_html_re().HTML_OPEN_CLOSE_TAG_RE;
    var HTML_SEQUENCES = [
      [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
      [/^<!--/, /-->/, true],
      [/^<\?/, /\?>/, true],
      [/^<![A-Z]/, />/, true],
      [/^<!\[CDATA\[/, /\]\]>/, true],
      [new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
      [new RegExp(HTML_OPEN_CLOSE_TAG_RE2.source + "\\s*$"), /^$/, false]
    ];
    module2.exports = function html_block(state, startLine, endLine, silent) {
      var i2, nextLine, token, lineText, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (!state.md.options.html) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      lineText = state.src.slice(pos, max);
      for (i2 = 0; i2 < HTML_SEQUENCES.length; i2++) {
        if (HTML_SEQUENCES[i2][0].test(lineText)) {
          break;
        }
      }
      if (i2 === HTML_SEQUENCES.length) {
        return false;
      }
      if (silent) {
        return HTML_SEQUENCES[i2][2];
      }
      nextLine = startLine + 1;
      if (!HTML_SEQUENCES[i2][1].test(lineText)) {
        for (; nextLine < endLine; nextLine++) {
          if (state.sCount[nextLine] < state.blkIndent) {
            break;
          }
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          lineText = state.src.slice(pos, max);
          if (HTML_SEQUENCES[i2][1].test(lineText)) {
            if (lineText.length !== 0) {
              nextLine++;
            }
            break;
          }
        }
      }
      state.line = nextLine;
      token = state.push("html_block", "", 0);
      token.map = [startLine, nextLine];
      token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/heading.js
var require_heading = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/heading.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    module2.exports = function heading(state, startLine, endLine, silent) {
      var ch, level, tmp, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      ch = state.src.charCodeAt(pos);
      if (ch !== 35 || pos >= max) {
        return false;
      }
      level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 35 && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }
      if (level > 6 || pos < max && !isSpace(ch)) {
        return false;
      }
      if (silent) {
        return true;
      }
      max = state.skipSpacesBack(max, pos);
      tmp = state.skipCharsBack(max, 35, pos);
      if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
        max = tmp;
      }
      state.line = startLine + 1;
      token = state.push("heading_open", "h" + String(level), 1);
      token.markup = "########".slice(0, level);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = state.src.slice(pos, max).trim();
      token.map = [startLine, state.line];
      token.children = [];
      token = state.push("heading_close", "h" + String(level), -1);
      token.markup = "########".slice(0, level);
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/lheading.js
var require_lheading = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/lheading.js"(exports2, module2) {
    "use strict";
    module2.exports = function lheading(state, startLine, endLine) {
      var content, terminate, i2, l2, token, pos, max, level, marker, nextLine = startLine + 1, oldParentType, terminatorRules = state.md.block.ruler.getRules("paragraph");
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] >= state.blkIndent) {
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          if (pos < max) {
            marker = state.src.charCodeAt(pos);
            if (marker === 45 || marker === 61) {
              pos = state.skipChars(pos, marker);
              pos = state.skipSpaces(pos);
              if (pos >= max) {
                level = marker === 61 ? 1 : 2;
                break;
              }
            }
          }
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      if (!level) {
        return false;
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine + 1;
      token = state.push("heading_open", "h" + String(level), 1);
      token.markup = String.fromCharCode(marker);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = content;
      token.map = [startLine, state.line - 1];
      token.children = [];
      token = state.push("heading_close", "h" + String(level), -1);
      token.markup = String.fromCharCode(marker);
      state.parentType = oldParentType;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/paragraph.js
var require_paragraph = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/paragraph.js"(exports2, module2) {
    "use strict";
    module2.exports = function paragraph(state, startLine) {
      var content, terminate, i2, l2, token, oldParentType, nextLine = startLine + 1, terminatorRules = state.md.block.ruler.getRules("paragraph"), endLine = state.lineMax;
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) {
          if (terminatorRules[i2](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine;
      token = state.push("paragraph_open", "p", 1);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = content;
      token.map = [startLine, state.line];
      token.children = [];
      token = state.push("paragraph_close", "p", -1);
      state.parentType = oldParentType;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/state_block.js
var require_state_block = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_block/state_block.js"(exports2, module2) {
    "use strict";
    var Token = require_token();
    var isSpace = require_utils3().isSpace;
    function StateBlock(src, md, env, tokens) {
      var ch, s2, start, pos, len, indent, offset, indent_found;
      this.src = src;
      this.md = md;
      this.env = env;
      this.tokens = tokens;
      this.bMarks = [];
      this.eMarks = [];
      this.tShift = [];
      this.sCount = [];
      this.bsCount = [];
      this.blkIndent = 0;
      this.line = 0;
      this.lineMax = 0;
      this.tight = false;
      this.ddIndent = -1;
      this.listIndent = -1;
      this.parentType = "root";
      this.level = 0;
      this.result = "";
      s2 = this.src;
      indent_found = false;
      for (start = pos = indent = offset = 0, len = s2.length; pos < len; pos++) {
        ch = s2.charCodeAt(pos);
        if (!indent_found) {
          if (isSpace(ch)) {
            indent++;
            if (ch === 9) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
            continue;
          } else {
            indent_found = true;
          }
        }
        if (ch === 10 || pos === len - 1) {
          if (ch !== 10) {
            pos++;
          }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          this.sCount.push(offset);
          this.bsCount.push(0);
          indent_found = false;
          indent = 0;
          offset = 0;
          start = pos + 1;
        }
      }
      this.bMarks.push(s2.length);
      this.eMarks.push(s2.length);
      this.tShift.push(0);
      this.sCount.push(0);
      this.bsCount.push(0);
      this.lineMax = this.bMarks.length - 1;
    }
    StateBlock.prototype.push = function(type, tag, nesting) {
      var token = new Token(type, tag, nesting);
      token.block = true;
      if (nesting < 0)
        this.level--;
      token.level = this.level;
      if (nesting > 0)
        this.level++;
      this.tokens.push(token);
      return token;
    };
    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };
    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (var max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      var ch;
      for (var max = this.src.length; pos < max; pos++) {
        ch = this.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (!isSpace(this.src.charCodeAt(--pos))) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipChars = function skipChars(pos, code) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (code !== this.src.charCodeAt(--pos)) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      var i2, lineIndent, ch, first, last, queue, lineStart, line = begin;
      if (begin >= end) {
        return "";
      }
      queue = new Array(end - begin);
      for (i2 = 0; line < end; line++, i2++) {
        lineIndent = 0;
        lineStart = first = this.bMarks[line];
        if (line + 1 < end || keepLastLF) {
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }
        while (first < last && lineIndent < indent) {
          ch = this.src.charCodeAt(first);
          if (isSpace(ch)) {
            if (ch === 9) {
              lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
            } else {
              lineIndent++;
            }
          } else if (first - lineStart < this.tShift[line]) {
            lineIndent++;
          } else {
            break;
          }
          first++;
        }
        if (lineIndent > indent) {
          queue[i2] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
        } else {
          queue[i2] = this.src.slice(first, last);
        }
      }
      return queue.join("");
    };
    StateBlock.prototype.Token = Token;
    module2.exports = StateBlock;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_block.js
var require_parser_block = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_block.js"(exports2, module2) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      ["table", require_table(), ["paragraph", "reference"]],
      ["code", require_code()],
      ["fence", require_fence(), ["paragraph", "reference", "blockquote", "list"]],
      ["blockquote", require_blockquote(), ["paragraph", "reference", "blockquote", "list"]],
      ["hr", require_hr(), ["paragraph", "reference", "blockquote", "list"]],
      ["list", require_list(), ["paragraph", "reference", "blockquote"]],
      ["reference", require_reference()],
      ["html_block", require_html_block(), ["paragraph", "reference", "blockquote"]],
      ["heading", require_heading(), ["paragraph", "reference", "blockquote"]],
      ["lheading", require_lheading()],
      ["paragraph", require_paragraph()]
    ];
    function ParserBlock() {
      this.ruler = new Ruler();
      for (var i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1], { alt: (_rules[i2][2] || []).slice() });
      }
    }
    ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
      var ok, i2, rules = this.ruler.getRules(""), len = rules.length, line = startLine, hasEmptyLines = false, maxNesting = state.md.options.maxNesting;
      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) {
          break;
        }
        if (state.sCount[line] < state.blkIndent) {
          break;
        }
        if (state.level >= maxNesting) {
          state.line = endLine;
          break;
        }
        for (i2 = 0; i2 < len; i2++) {
          ok = rules[i2](state, line, endLine, false);
          if (ok) {
            break;
          }
        }
        state.tight = !hasEmptyLines;
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }
        line = state.line;
        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          state.line = line;
        }
      }
    };
    ParserBlock.prototype.parse = function(src, md, env, outTokens) {
      var state;
      if (!src) {
        return;
      }
      state = new this.State(src, md, env, outTokens);
      this.tokenize(state, state.line, state.lineMax);
    };
    ParserBlock.prototype.State = require_state_block();
    module2.exports = ParserBlock;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/text.js
var require_text = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/text.js"(exports2, module2) {
    "use strict";
    function isTerminatorChar(ch) {
      switch (ch) {
        case 10:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 42:
        case 43:
        case 45:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    module2.exports = function text(state, silent) {
      var pos = state.pos;
      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }
      if (pos === state.pos) {
        return false;
      }
      if (!silent) {
        state.pending += state.src.slice(state.pos, pos);
      }
      state.pos = pos;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/linkify.js
var require_linkify2 = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/linkify.js"(exports2, module2) {
    "use strict";
    var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
    module2.exports = function linkify(state, silent) {
      var pos, max, match, proto2, link, url, fullUrl, token;
      if (!state.md.options.linkify)
        return false;
      if (state.linkLevel > 0)
        return false;
      pos = state.pos;
      max = state.posMax;
      if (pos + 3 > max)
        return false;
      if (state.src.charCodeAt(pos) !== 58)
        return false;
      if (state.src.charCodeAt(pos + 1) !== 47)
        return false;
      if (state.src.charCodeAt(pos + 2) !== 47)
        return false;
      match = state.pending.match(SCHEME_RE);
      if (!match)
        return false;
      proto2 = match[1];
      link = state.md.linkify.matchAtStart(state.src.slice(pos - proto2.length));
      if (!link)
        return false;
      url = link.url;
      url = url.replace(/\*+$/, "");
      fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl))
        return false;
      if (!silent) {
        state.pending = state.pending.slice(0, -proto2.length);
        token = state.push("link_open", "a", 1);
        token.attrs = [["href", fullUrl]];
        token.markup = "linkify";
        token.info = "auto";
        token = state.push("text", "", 0);
        token.content = state.md.normalizeLinkText(url);
        token = state.push("link_close", "a", -1);
        token.markup = "linkify";
        token.info = "auto";
      }
      state.pos += url.length - proto2.length;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/newline.js
var require_newline = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/newline.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    module2.exports = function newline(state, silent) {
      var pmax, max, ws, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 10) {
        return false;
      }
      pmax = state.pending.length - 1;
      max = state.posMax;
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
            ws = pmax - 1;
            while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32)
              ws--;
            state.pending = state.pending.slice(0, ws);
            state.push("hardbreak", "br", 0);
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push("softbreak", "br", 0);
          }
        } else {
          state.push("softbreak", "br", 0);
        }
      }
      pos++;
      while (pos < max && isSpace(state.src.charCodeAt(pos))) {
        pos++;
      }
      state.pos = pos;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/escape.js
var require_escape = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/escape.js"(exports2, module2) {
    "use strict";
    var isSpace = require_utils3().isSpace;
    var ESCAPED = [];
    for (i2 = 0; i2 < 256; i2++) {
      ESCAPED.push(0);
    }
    var i2;
    "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
      ESCAPED[ch.charCodeAt(0)] = 1;
    });
    module2.exports = function escape(state, silent) {
      var ch1, ch2, origStr, escapedStr, token, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 92)
        return false;
      pos++;
      if (pos >= max)
        return false;
      ch1 = state.src.charCodeAt(pos);
      if (ch1 === 10) {
        if (!silent) {
          state.push("hardbreak", "br", 0);
        }
        pos++;
        while (pos < max) {
          ch1 = state.src.charCodeAt(pos);
          if (!isSpace(ch1))
            break;
          pos++;
        }
        state.pos = pos;
        return true;
      }
      escapedStr = state.src[pos];
      if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
        ch2 = state.src.charCodeAt(pos + 1);
        if (ch2 >= 56320 && ch2 <= 57343) {
          escapedStr += state.src[pos + 1];
          pos++;
        }
      }
      origStr = "\\" + escapedStr;
      if (!silent) {
        token = state.push("text_special", "", 0);
        if (ch1 < 256 && ESCAPED[ch1] !== 0) {
          token.content = escapedStr;
        } else {
          token.content = origStr;
        }
        token.markup = origStr;
        token.info = "escape";
      }
      state.pos = pos + 1;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/backticks.js
var require_backticks = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/backticks.js"(exports2, module2) {
    "use strict";
    module2.exports = function backtick(state, silent) {
      var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength, pos = state.pos, ch = state.src.charCodeAt(pos);
      if (ch !== 96) {
        return false;
      }
      start = pos;
      pos++;
      max = state.posMax;
      while (pos < max && state.src.charCodeAt(pos) === 96) {
        pos++;
      }
      marker = state.src.slice(start, pos);
      openerLength = marker.length;
      if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
        if (!silent)
          state.pending += marker;
        state.pos += openerLength;
        return true;
      }
      matchStart = matchEnd = pos;
      while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
        matchEnd = matchStart + 1;
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
          matchEnd++;
        }
        closerLength = matchEnd - matchStart;
        if (closerLength === openerLength) {
          if (!silent) {
            token = state.push("code_inline", "code", 0);
            token.markup = marker;
            token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
          }
          state.pos = matchEnd;
          return true;
        }
        state.backticks[closerLength] = matchStart;
      }
      state.backticksScanned = true;
      if (!silent)
        state.pending += marker;
      state.pos += openerLength;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/strikethrough.js
var require_strikethrough = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/strikethrough.js"(exports2, module2) {
    "use strict";
    module2.exports.tokenize = function strikethrough(state, silent) {
      var i2, scanned, token, len, ch, start = state.pos, marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 126) {
        return false;
      }
      scanned = state.scanDelims(state.pos, true);
      len = scanned.length;
      ch = String.fromCharCode(marker);
      if (len < 2) {
        return false;
      }
      if (len % 2) {
        token = state.push("text", "", 0);
        token.content = ch;
        len--;
      }
      for (i2 = 0; i2 < len; i2 += 2) {
        token = state.push("text", "", 0);
        token.content = ch + ch;
        state.delimiters.push({
          marker,
          length: 0,
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    function postProcess(state, delimiters) {
      var i2, j, startDelim, endDelim, token, loneMarkers = [], max = delimiters.length;
      for (i2 = 0; i2 < max; i2++) {
        startDelim = delimiters[i2];
        if (startDelim.marker !== 126) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        token = state.tokens[startDelim.token];
        token.type = "s_open";
        token.tag = "s";
        token.nesting = 1;
        token.markup = "~~";
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = "s_close";
        token.tag = "s";
        token.nesting = -1;
        token.markup = "~~";
        token.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        i2 = loneMarkers.pop();
        j = i2 + 1;
        while (j < state.tokens.length && state.tokens[j].type === "s_close") {
          j++;
        }
        j--;
        if (i2 !== j) {
          token = state.tokens[j];
          state.tokens[j] = state.tokens[i2];
          state.tokens[i2] = token;
        }
      }
    }
    module2.exports.postProcess = function strikethrough(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      postProcess(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/emphasis.js
var require_emphasis = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/emphasis.js"(exports2, module2) {
    "use strict";
    module2.exports.tokenize = function emphasis(state, silent) {
      var i2, scanned, token, start = state.pos, marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 95 && marker !== 42) {
        return false;
      }
      scanned = state.scanDelims(state.pos, marker === 42);
      for (i2 = 0; i2 < scanned.length; i2++) {
        token = state.push("text", "", 0);
        token.content = String.fromCharCode(marker);
        state.delimiters.push({
          marker,
          length: scanned.length,
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    function postProcess(state, delimiters) {
      var i2, startDelim, endDelim, token, ch, isStrong, max = delimiters.length;
      for (i2 = max - 1; i2 >= 0; i2--) {
        startDelim = delimiters[i2];
        if (startDelim.marker !== 95 && startDelim.marker !== 42) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        isStrong = i2 > 0 && delimiters[i2 - 1].end === startDelim.end + 1 && delimiters[i2 - 1].marker === startDelim.marker && delimiters[i2 - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1;
        ch = String.fromCharCode(startDelim.marker);
        token = state.tokens[startDelim.token];
        token.type = isStrong ? "strong_open" : "em_open";
        token.tag = isStrong ? "strong" : "em";
        token.nesting = 1;
        token.markup = isStrong ? ch + ch : ch;
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = isStrong ? "strong_close" : "em_close";
        token.tag = isStrong ? "strong" : "em";
        token.nesting = -1;
        token.markup = isStrong ? ch + ch : ch;
        token.content = "";
        if (isStrong) {
          state.tokens[delimiters[i2 - 1].token].content = "";
          state.tokens[delimiters[startDelim.end + 1].token].content = "";
          i2--;
        }
      }
    }
    module2.exports.postProcess = function emphasis(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      postProcess(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/link.js
var require_link2 = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/link.js"(exports2, module2) {
    "use strict";
    var normalizeReference = require_utils3().normalizeReference;
    var isSpace = require_utils3().isSpace;
    module2.exports = function link(state, silent) {
      var attrs, code, label, labelEnd, labelStart, pos, res, ref, token, href = "", title = "", oldPos = state.pos, max = state.posMax, start = state.pos, parseReference = true;
      if (state.src.charCodeAt(state.pos) !== 91) {
        return false;
      }
      labelStart = state.pos + 1;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        parseReference = false;
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
          start = pos;
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 10) {
              break;
            }
          }
          res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
          if (pos < max && start !== pos && res.ok) {
            title = res.str;
            pos = res.pos;
            for (; pos < max; pos++) {
              code = state.src.charCodeAt(pos);
              if (!isSpace(code) && code !== 10) {
                break;
              }
            }
          }
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          parseReference = true;
        }
        pos++;
      }
      if (parseReference) {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;
        token = state.push("link_open", "a", 1);
        token.attrs = attrs = [["href", href]];
        if (title) {
          attrs.push(["title", title]);
        }
        state.linkLevel++;
        state.md.inline.tokenize(state);
        state.linkLevel--;
        token = state.push("link_close", "a", -1);
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/image.js
var require_image = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/image.js"(exports2, module2) {
    "use strict";
    var normalizeReference = require_utils3().normalizeReference;
    var isSpace = require_utils3().isSpace;
    module2.exports = function image(state, silent) {
      var attrs, code, content, label, labelEnd, labelStart, pos, ref, res, title, token, tokens, start, href = "", oldPos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(state.pos) !== 33) {
        return false;
      }
      if (state.src.charCodeAt(state.pos + 1) !== 91) {
        return false;
      }
      labelStart = state.pos + 2;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
        }
        start = pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }
      if (!silent) {
        content = state.src.slice(labelStart, labelEnd);
        state.md.inline.parse(
          content,
          state.md,
          state.env,
          tokens = []
        );
        token = state.push("image", "img", 0);
        token.attrs = attrs = [["src", href], ["alt", ""]];
        token.children = tokens;
        token.content = content;
        if (title) {
          attrs.push(["title", title]);
        }
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/autolink.js
var require_autolink = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/autolink.js"(exports2, module2) {
    "use strict";
    var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
    var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
    module2.exports = function autolink(state, silent) {
      var url, fullUrl, token, ch, start, max, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      start = state.pos;
      max = state.posMax;
      for (; ; ) {
        if (++pos >= max)
          return false;
        ch = state.src.charCodeAt(pos);
        if (ch === 60)
          return false;
        if (ch === 62)
          break;
      }
      url = state.src.slice(start + 1, pos);
      if (AUTOLINK_RE.test(url)) {
        fullUrl = state.md.normalizeLink(url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token = state.push("link_open", "a", 1);
          token.attrs = [["href", fullUrl]];
          token.markup = "autolink";
          token.info = "auto";
          token = state.push("text", "", 0);
          token.content = state.md.normalizeLinkText(url);
          token = state.push("link_close", "a", -1);
          token.markup = "autolink";
          token.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      if (EMAIL_RE.test(url)) {
        fullUrl = state.md.normalizeLink("mailto:" + url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token = state.push("link_open", "a", 1);
          token.attrs = [["href", fullUrl]];
          token.markup = "autolink";
          token.info = "auto";
          token = state.push("text", "", 0);
          token.content = state.md.normalizeLinkText(url);
          token = state.push("link_close", "a", -1);
          token.markup = "autolink";
          token.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      return false;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/html_inline.js
var require_html_inline = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/html_inline.js"(exports2, module2) {
    "use strict";
    var HTML_TAG_RE2 = require_html_re().HTML_TAG_RE;
    function isLinkOpen(str2) {
      return /^<a[>\s]/i.test(str2);
    }
    function isLinkClose(str2) {
      return /^<\/a\s*>/i.test(str2);
    }
    function isLetter2(ch) {
      var lc = ch | 32;
      return lc >= 97 && lc <= 122;
    }
    module2.exports = function html_inline(state, silent) {
      var ch, match, max, token, pos = state.pos;
      if (!state.md.options.html) {
        return false;
      }
      max = state.posMax;
      if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
        return false;
      }
      ch = state.src.charCodeAt(pos + 1);
      if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter2(ch)) {
        return false;
      }
      match = state.src.slice(pos).match(HTML_TAG_RE2);
      if (!match) {
        return false;
      }
      if (!silent) {
        token = state.push("html_inline", "", 0);
        token.content = state.src.slice(pos, pos + match[0].length);
        if (isLinkOpen(token.content))
          state.linkLevel++;
        if (isLinkClose(token.content))
          state.linkLevel--;
      }
      state.pos += match[0].length;
      return true;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/entity.js
var require_entity = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/entity.js"(exports2, module2) {
    "use strict";
    var entities = require_entities2();
    var has = require_utils3().has;
    var isValidEntityCode = require_utils3().isValidEntityCode;
    var fromCodePoint = require_utils3().fromCodePoint;
    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
    var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
    module2.exports = function entity(state, silent) {
      var ch, code, match, token, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 38)
        return false;
      if (pos + 1 >= max)
        return false;
      ch = state.src.charCodeAt(pos + 1);
      if (ch === 35) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            token = state.push("text_special", "", 0);
            token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(65533);
            token.markup = match[0];
            token.info = "entity";
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          if (has(entities, match[1])) {
            if (!silent) {
              token = state.push("text_special", "", 0);
              token.content = entities[match[1]];
              token.markup = match[0];
              token.info = "entity";
            }
            state.pos += match[0].length;
            return true;
          }
        }
      }
      return false;
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/balance_pairs.js
var require_balance_pairs = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/balance_pairs.js"(exports2, module2) {
    "use strict";
    function processDelimiters(state, delimiters) {
      var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx, isOddMatch, lastJump, openersBottom = {}, max = delimiters.length;
      if (!max)
        return;
      var headerIdx = 0;
      var lastTokenIdx = -2;
      var jumps = [];
      for (closerIdx = 0; closerIdx < max; closerIdx++) {
        closer = delimiters[closerIdx];
        jumps.push(0);
        if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
          headerIdx = closerIdx;
        }
        lastTokenIdx = closer.token;
        closer.length = closer.length || 0;
        if (!closer.close)
          continue;
        if (!openersBottom.hasOwnProperty(closer.marker)) {
          openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
        }
        minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
        openerIdx = headerIdx - jumps[headerIdx] - 1;
        newMinOpenerIdx = openerIdx;
        for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
          opener = delimiters[openerIdx];
          if (opener.marker !== closer.marker)
            continue;
          if (opener.open && opener.end < 0) {
            isOddMatch = false;
            if (opener.close || closer.open) {
              if ((opener.length + closer.length) % 3 === 0) {
                if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                  isOddMatch = true;
                }
              }
            }
            if (!isOddMatch) {
              lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
              jumps[closerIdx] = closerIdx - openerIdx + lastJump;
              jumps[openerIdx] = lastJump;
              closer.open = false;
              opener.end = closerIdx;
              opener.close = false;
              newMinOpenerIdx = -1;
              lastTokenIdx = -2;
              break;
            }
          }
        }
        if (newMinOpenerIdx !== -1) {
          openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
        }
      }
    }
    module2.exports = function link_pairs(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      processDelimiters(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          processDelimiters(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/fragments_join.js
var require_fragments_join = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/fragments_join.js"(exports2, module2) {
    "use strict";
    module2.exports = function fragments_join(state) {
      var curr, last, level = 0, tokens = state.tokens, max = state.tokens.length;
      for (curr = last = 0; curr < max; curr++) {
        if (tokens[curr].nesting < 0)
          level--;
        tokens[curr].level = level;
        if (tokens[curr].nesting > 0)
          level++;
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/state_inline.js
var require_state_inline = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/rules_inline/state_inline.js"(exports2, module2) {
    "use strict";
    var Token = require_token();
    var isWhiteSpace = require_utils3().isWhiteSpace;
    var isPunctChar = require_utils3().isPunctChar;
    var isMdAsciiPunct = require_utils3().isMdAsciiPunct;
    function StateInline(src, md, env, outTokens) {
      this.src = src;
      this.env = env;
      this.md = md;
      this.tokens = outTokens;
      this.tokens_meta = Array(outTokens.length);
      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = "";
      this.pendingLevel = 0;
      this.cache = {};
      this.delimiters = [];
      this._prev_delimiters = [];
      this.backticks = {};
      this.backticksScanned = false;
      this.linkLevel = 0;
    }
    StateInline.prototype.pushPending = function() {
      var token = new Token("text", "", 0);
      token.content = this.pending;
      token.level = this.pendingLevel;
      this.tokens.push(token);
      this.pending = "";
      return token;
    };
    StateInline.prototype.push = function(type, tag, nesting) {
      if (this.pending) {
        this.pushPending();
      }
      var token = new Token(type, tag, nesting);
      var token_meta = null;
      if (nesting < 0) {
        this.level--;
        this.delimiters = this._prev_delimiters.pop();
      }
      token.level = this.level;
      if (nesting > 0) {
        this.level++;
        this._prev_delimiters.push(this.delimiters);
        this.delimiters = [];
        token_meta = { delimiters: this.delimiters };
      }
      this.pendingLevel = this.level;
      this.tokens.push(token);
      this.tokens_meta.push(token_meta);
      return token;
    };
    StateInline.prototype.scanDelims = function(start, canSplitWord) {
      var pos = start, lastChar, nextChar, count, can_open, can_close, isLastWhiteSpace, isLastPunctChar, isNextWhiteSpace, isNextPunctChar, left_flanking = true, right_flanking = true, max = this.posMax, marker = this.src.charCodeAt(start);
      lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
      while (pos < max && this.src.charCodeAt(pos) === marker) {
        pos++;
      }
      count = pos - start;
      nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);
      if (isNextWhiteSpace) {
        left_flanking = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          left_flanking = false;
        }
      }
      if (isLastWhiteSpace) {
        right_flanking = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          right_flanking = false;
        }
      }
      if (!canSplitWord) {
        can_open = left_flanking && (!right_flanking || isLastPunctChar);
        can_close = right_flanking && (!left_flanking || isNextPunctChar);
      } else {
        can_open = left_flanking;
        can_close = right_flanking;
      }
      return {
        can_open,
        can_close,
        length: count
      };
    };
    StateInline.prototype.Token = Token;
    module2.exports = StateInline;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_inline.js
var require_parser_inline = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/parser_inline.js"(exports2, module2) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      ["text", require_text()],
      ["linkify", require_linkify2()],
      ["newline", require_newline()],
      ["escape", require_escape()],
      ["backticks", require_backticks()],
      ["strikethrough", require_strikethrough().tokenize],
      ["emphasis", require_emphasis().tokenize],
      ["link", require_link2()],
      ["image", require_image()],
      ["autolink", require_autolink()],
      ["html_inline", require_html_inline()],
      ["entity", require_entity()]
    ];
    var _rules2 = [
      ["balance_pairs", require_balance_pairs()],
      ["strikethrough", require_strikethrough().postProcess],
      ["emphasis", require_emphasis().postProcess],
      ["fragments_join", require_fragments_join()]
    ];
    function ParserInline() {
      var i2;
      this.ruler = new Ruler();
      for (i2 = 0; i2 < _rules.length; i2++) {
        this.ruler.push(_rules[i2][0], _rules[i2][1]);
      }
      this.ruler2 = new Ruler();
      for (i2 = 0; i2 < _rules2.length; i2++) {
        this.ruler2.push(_rules2[i2][0], _rules2[i2][1]);
      }
    }
    ParserInline.prototype.skipToken = function(state) {
      var ok, i2, pos = state.pos, rules = this.ruler.getRules(""), len = rules.length, maxNesting = state.md.options.maxNesting, cache = state.cache;
      if (typeof cache[pos] !== "undefined") {
        state.pos = cache[pos];
        return;
      }
      if (state.level < maxNesting) {
        for (i2 = 0; i2 < len; i2++) {
          state.level++;
          ok = rules[i2](state, true);
          state.level--;
          if (ok) {
            break;
          }
        }
      } else {
        state.pos = state.posMax;
      }
      if (!ok) {
        state.pos++;
      }
      cache[pos] = state.pos;
    };
    ParserInline.prototype.tokenize = function(state) {
      var ok, i2, rules = this.ruler.getRules(""), len = rules.length, end = state.posMax, maxNesting = state.md.options.maxNesting;
      while (state.pos < end) {
        if (state.level < maxNesting) {
          for (i2 = 0; i2 < len; i2++) {
            ok = rules[i2](state, false);
            if (ok) {
              break;
            }
          }
        }
        if (ok) {
          if (state.pos >= end) {
            break;
          }
          continue;
        }
        state.pending += state.src[state.pos++];
      }
      if (state.pending) {
        state.pushPending();
      }
    };
    ParserInline.prototype.parse = function(str2, md, env, outTokens) {
      var i2, rules, len;
      var state = new this.State(str2, md, env, outTokens);
      this.tokenize(state);
      rules = this.ruler2.getRules("");
      len = rules.length;
      for (i2 = 0; i2 < len; i2++) {
        rules[i2](state);
      }
    };
    ParserInline.prototype.State = require_state_inline();
    module2.exports = ParserInline;
  }
});

// node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/lib/re.js
var require_re = __commonJS({
  "node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/lib/re.js"(exports2, module2) {
    "use strict";
    module2.exports = function(opts) {
      var re = {};
      opts = opts || {};
      re.src_Any = require_regex2().source;
      re.src_Cc = require_regex3().source;
      re.src_Z = require_regex5().source;
      re.src_P = require_regex().source;
      re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join("|");
      re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
      var text_separators = "[><\uFF5C]";
      re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
      re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
      re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
      re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
      re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
      re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
      re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
      re.src_xn = "xn--[a-z0-9\\-]{1,59}";
      re.src_domain_root = "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
      re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
      re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
      re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
      re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
      re.src_host_strict = re.src_host + re.src_host_terminator;
      re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
      re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
      re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
      re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
      re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
      re.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
      re.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
      re.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
      return re;
    };
  }
});

// node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/index.js
var require_linkify_it = __commonJS({
  "node_modules/.pnpm/linkify-it@4.0.1/node_modules/linkify-it/index.js"(exports2, module2) {
    "use strict";
    function assign(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString2(obj) {
      return _class(obj) === "[object String]";
    }
    function isObject(obj) {
      return _class(obj) === "[object Object]";
    }
    function isRegExp(obj) {
      return _class(obj) === "[object RegExp]";
    }
    function isFunction2(obj) {
      return _class(obj) === "[object Function]";
    }
    function escapeRE(str2) {
      return str2.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    var defaultOptions = {
      fuzzyLink: true,
      fuzzyEmail: true,
      fuzzyIP: false
    };
    function isOptionsObj(obj) {
      return Object.keys(obj || {}).reduce(function(acc, k) {
        return acc || defaultOptions.hasOwnProperty(k);
      }, false);
    }
    var defaultSchemas = {
      "http:": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.http) {
            self.re.http = new RegExp(
              "^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path,
              "i"
            );
          }
          if (self.re.http.test(tail)) {
            return tail.match(self.re.http)[0].length;
          }
          return 0;
        }
      },
      "https:": "http:",
      "ftp:": "http:",
      "//": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.no_http) {
            self.re.no_http = new RegExp(
              "^" + self.re.src_auth + "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
              "i"
            );
          }
          if (self.re.no_http.test(tail)) {
            if (pos >= 3 && text[pos - 3] === ":") {
              return 0;
            }
            if (pos >= 3 && text[pos - 3] === "/") {
              return 0;
            }
            return tail.match(self.re.no_http)[0].length;
          }
          return 0;
        }
      },
      "mailto:": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.mailto) {
            self.re.mailto = new RegExp(
              "^" + self.re.src_email_name + "@" + self.re.src_host_strict,
              "i"
            );
          }
          if (self.re.mailto.test(tail)) {
            return tail.match(self.re.mailto)[0].length;
          }
          return 0;
        }
      }
    };
    var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
    var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");
    function resetScanCache(self) {
      self.__index__ = -1;
      self.__text_cache__ = "";
    }
    function createValidator(re) {
      return function(text, pos) {
        var tail = text.slice(pos);
        if (re.test(tail)) {
          return tail.match(re)[0].length;
        }
        return 0;
      };
    }
    function createNormalizer() {
      return function(match, self) {
        self.normalize(match);
      };
    }
    function compile(self) {
      var re = self.re = require_re()(self.__opts__);
      var tlds = self.__tlds__.slice();
      self.onCompile();
      if (!self.__tlds_replaced__) {
        tlds.push(tlds_2ch_src_re);
      }
      tlds.push(re.src_xn);
      re.src_tlds = tlds.join("|");
      function untpl(tpl) {
        return tpl.replace("%TLDS%", re.src_tlds);
      }
      re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
      re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
      re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
      re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
      var aliases = [];
      self.__compiled__ = {};
      function schemaError(name, val) {
        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
      }
      Object.keys(self.__schemas__).forEach(function(name) {
        var val = self.__schemas__[name];
        if (val === null) {
          return;
        }
        var compiled = { validate: null, link: null };
        self.__compiled__[name] = compiled;
        if (isObject(val)) {
          if (isRegExp(val.validate)) {
            compiled.validate = createValidator(val.validate);
          } else if (isFunction2(val.validate)) {
            compiled.validate = val.validate;
          } else {
            schemaError(name, val);
          }
          if (isFunction2(val.normalize)) {
            compiled.normalize = val.normalize;
          } else if (!val.normalize) {
            compiled.normalize = createNormalizer();
          } else {
            schemaError(name, val);
          }
          return;
        }
        if (isString2(val)) {
          aliases.push(name);
          return;
        }
        schemaError(name, val);
      });
      aliases.forEach(function(alias) {
        if (!self.__compiled__[self.__schemas__[alias]]) {
          return;
        }
        self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
        self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
      });
      self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
      var slist = Object.keys(self.__compiled__).filter(function(name) {
        return name.length > 0 && self.__compiled__[name];
      }).map(escapeRE).join("|");
      self.re.schema_test = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "i");
      self.re.schema_search = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
      self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
      self.re.pretest = RegExp(
        "(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@",
        "i"
      );
      resetScanCache(self);
    }
    function Match(self, shift) {
      var start = self.__index__, end = self.__last_index__, text = self.__text_cache__.slice(start, end);
      this.schema = self.__schema__.toLowerCase();
      this.index = start + shift;
      this.lastIndex = end + shift;
      this.raw = text;
      this.text = text;
      this.url = text;
    }
    function createMatch(self, shift) {
      var match = new Match(self, shift);
      self.__compiled__[match.schema].normalize(match, self);
      return match;
    }
    function LinkifyIt(schemas, options2) {
      if (!(this instanceof LinkifyIt)) {
        return new LinkifyIt(schemas, options2);
      }
      if (!options2) {
        if (isOptionsObj(schemas)) {
          options2 = schemas;
          schemas = {};
        }
      }
      this.__opts__ = assign({}, defaultOptions, options2);
      this.__index__ = -1;
      this.__last_index__ = -1;
      this.__schema__ = "";
      this.__text_cache__ = "";
      this.__schemas__ = assign({}, defaultSchemas, schemas);
      this.__compiled__ = {};
      this.__tlds__ = tlds_default;
      this.__tlds_replaced__ = false;
      this.re = {};
      compile(this);
    }
    LinkifyIt.prototype.add = function add(schema, definition) {
      this.__schemas__[schema] = definition;
      compile(this);
      return this;
    };
    LinkifyIt.prototype.set = function set(options2) {
      this.__opts__ = assign(this.__opts__, options2);
      return this;
    };
    LinkifyIt.prototype.test = function test(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length) {
        return false;
      }
      var m, ml, me, len, shift, next, re, tld_pos, at_pos;
      if (this.re.schema_test.test(text)) {
        re = this.re.schema_search;
        re.lastIndex = 0;
        while ((m = re.exec(text)) !== null) {
          len = this.testSchemaAt(text, m[2], re.lastIndex);
          if (len) {
            this.__schema__ = m[2];
            this.__index__ = m.index + m[1].length;
            this.__last_index__ = m.index + m[0].length + len;
            break;
          }
        }
      }
      if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
        tld_pos = text.search(this.re.host_fuzzy_test);
        if (tld_pos >= 0) {
          if (this.__index__ < 0 || tld_pos < this.__index__) {
            if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
              shift = ml.index + ml[1].length;
              if (this.__index__ < 0 || shift < this.__index__) {
                this.__schema__ = "";
                this.__index__ = shift;
                this.__last_index__ = ml.index + ml[0].length;
              }
            }
          }
        }
      }
      if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
        at_pos = text.indexOf("@");
        if (at_pos >= 0) {
          if ((me = text.match(this.re.email_fuzzy)) !== null) {
            shift = me.index + me[1].length;
            next = me.index + me[0].length;
            if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
              this.__schema__ = "mailto:";
              this.__index__ = shift;
              this.__last_index__ = next;
            }
          }
        }
      }
      return this.__index__ >= 0;
    };
    LinkifyIt.prototype.pretest = function pretest(text) {
      return this.re.pretest.test(text);
    };
    LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
      if (!this.__compiled__[schema.toLowerCase()]) {
        return 0;
      }
      return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
    };
    LinkifyIt.prototype.match = function match(text) {
      var shift = 0, result = [];
      if (this.__index__ >= 0 && this.__text_cache__ === text) {
        result.push(createMatch(this, shift));
        shift = this.__last_index__;
      }
      var tail = shift ? text.slice(shift) : text;
      while (this.test(tail)) {
        result.push(createMatch(this, shift));
        tail = tail.slice(this.__last_index__);
        shift += this.__last_index__;
      }
      if (result.length) {
        return result;
      }
      return null;
    };
    LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length)
        return null;
      var m = this.re.schema_at_start.exec(text);
      if (!m)
        return null;
      var len = this.testSchemaAt(text, m[2], m[0].length);
      if (!len)
        return null;
      this.__schema__ = m[2];
      this.__index__ = m.index + m[1].length;
      this.__last_index__ = m.index + m[0].length + len;
      return createMatch(this, 0);
    };
    LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
      list = Array.isArray(list) ? list : [list];
      if (!keepOld) {
        this.__tlds__ = list.slice();
        this.__tlds_replaced__ = true;
        compile(this);
        return this;
      }
      this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
        return el !== arr[idx - 1];
      }).reverse();
      compile(this);
      return this;
    };
    LinkifyIt.prototype.normalize = function normalize(match) {
      if (!match.schema) {
        match.url = "http://" + match.url;
      }
      if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
        match.url = "mailto:" + match.url;
      }
    };
    LinkifyIt.prototype.onCompile = function onCompile() {
    };
    module2.exports = LinkifyIt;
  }
});

// browser-external:punycode
var require_punycode = __commonJS({
  "browser-external:punycode"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "punycode" has been externalized for browser compatibility. Cannot access "punycode.${key}" in client code.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/default.js
var require_default = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/default.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      options: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkify: false,
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 100
      },
      components: {
        core: {},
        block: {},
        inline: {}
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/zero.js
var require_zero = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/zero.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      options: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkify: false,
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 20
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline",
            "text_join"
          ]
        },
        block: {
          rules: [
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "text"
          ],
          rules2: [
            "balance_pairs",
            "fragments_join"
          ]
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/commonmark.js
var require_commonmark = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/presets/commonmark.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      options: {
        html: true,
        xhtmlOut: true,
        breaks: false,
        langPrefix: "language-",
        linkify: false,
        typographer: false,
        quotes: "\u201C\u201D\u2018\u2019",
        highlight: null,
        maxNesting: 20
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline",
            "text_join"
          ]
        },
        block: {
          rules: [
            "blockquote",
            "code",
            "fence",
            "heading",
            "hr",
            "html_block",
            "lheading",
            "list",
            "reference",
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "autolink",
            "backticks",
            "emphasis",
            "entity",
            "escape",
            "html_inline",
            "image",
            "link",
            "newline",
            "text"
          ],
          rules2: [
            "balance_pairs",
            "emphasis",
            "fragments_join"
          ]
        }
      }
    };
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/lib/index.js"(exports2, module2) {
    "use strict";
    var utils = require_utils3();
    var helpers = require_helpers();
    var Renderer = require_renderer();
    var ParserCore = require_parser_core();
    var ParserBlock = require_parser_block();
    var ParserInline = require_parser_inline();
    var LinkifyIt = require_linkify_it();
    var mdurl = require_mdurl();
    var punycode = require_punycode();
    var config = {
      default: require_default(),
      zero: require_zero(),
      commonmark: require_commonmark()
    };
    var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
    function validateLink(url) {
      var str2 = url.trim().toLowerCase();
      return BAD_PROTO_RE.test(str2) ? GOOD_DATA_RE.test(str2) ? true : false : true;
    }
    var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
    function normalizeLink(url) {
      var parsed = mdurl.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toASCII(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl.encode(mdurl.format(parsed));
    }
    function normalizeLinkText(url) {
      var parsed = mdurl.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toUnicode(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + "%");
    }
    function MarkdownIt2(presetName, options2) {
      if (!(this instanceof MarkdownIt2)) {
        return new MarkdownIt2(presetName, options2);
      }
      if (!options2) {
        if (!utils.isString(presetName)) {
          options2 = presetName || {};
          presetName = "default";
        }
      }
      this.inline = new ParserInline();
      this.block = new ParserBlock();
      this.core = new ParserCore();
      this.renderer = new Renderer();
      this.linkify = new LinkifyIt();
      this.validateLink = validateLink;
      this.normalizeLink = normalizeLink;
      this.normalizeLinkText = normalizeLinkText;
      this.utils = utils;
      this.helpers = utils.assign({}, helpers);
      this.options = {};
      this.configure(presetName);
      if (options2) {
        this.set(options2);
      }
    }
    MarkdownIt2.prototype.set = function(options2) {
      utils.assign(this.options, options2);
      return this;
    };
    MarkdownIt2.prototype.configure = function(presets) {
      var self = this, presetName;
      if (utils.isString(presets)) {
        presetName = presets;
        presets = config[presetName];
        if (!presets) {
          throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
        }
      }
      if (!presets) {
        throw new Error("Wrong `markdown-it` preset, can't be empty");
      }
      if (presets.options) {
        self.set(presets.options);
      }
      if (presets.components) {
        Object.keys(presets.components).forEach(function(name) {
          if (presets.components[name].rules) {
            self[name].ruler.enableOnly(presets.components[name].rules);
          }
          if (presets.components[name].rules2) {
            self[name].ruler2.enableOnly(presets.components[name].rules2);
          }
        });
      }
      return this;
    };
    MarkdownIt2.prototype.enable = function(list, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list)) {
        list = [list];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.enable(list, true));
      }, this);
      result = result.concat(this.inline.ruler2.enable(list, true));
      var missed = list.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt2.prototype.disable = function(list, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list)) {
        list = [list];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.disable(list, true));
      }, this);
      result = result.concat(this.inline.ruler2.disable(list, true));
      var missed = list.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt2.prototype.use = function(plugin) {
      var args = [this].concat(Array.prototype.slice.call(arguments, 1));
      plugin.apply(plugin, args);
      return this;
    };
    MarkdownIt2.prototype.parse = function(src, env) {
      if (typeof src !== "string") {
        throw new Error("Input data should be a String");
      }
      var state = new this.core.State(src, this, env);
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt2.prototype.render = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parse(src, env), this.options, env);
    };
    MarkdownIt2.prototype.parseInline = function(src, env) {
      var state = new this.core.State(src, this, env);
      state.inlineMode = true;
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt2.prototype.renderInline = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parseInline(src, env), this.options, env);
    };
    module2.exports = MarkdownIt2;
  }
});

// node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/index.js
var require_markdown_it = __commonJS({
  "node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_lib2();
  }
});

// node_modules/.pnpm/kind-of@6.0.3/node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/.pnpm/kind-of@6.0.3/node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0)
        return "undefined";
      if (val === null)
        return "null";
      var type = typeof val;
      if (type === "boolean")
        return "boolean";
      if (type === "string")
        return "string";
      if (type === "number")
        return "number";
      if (type === "symbol")
        return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val))
        return "array";
      if (isBuffer(val))
        return "buffer";
      if (isArguments(val))
        return "arguments";
      if (isDate(val))
        return "date";
      if (isError(val))
        return "error";
      if (isRegexp(val))
        return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray)
        return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date)
        return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp)
        return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/.pnpm/is-extendable@0.1.1/node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/.pnpm/is-extendable@0.1.1/node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/.pnpm/extend-shallow@2.0.1/node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/.pnpm/extend-shallow@2.0.1/node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o2) {
      if (!isObject(o2)) {
        o2 = {};
      }
      var len = arguments.length;
      for (var i2 = 1; i2 < len; i2++) {
        var obj = arguments[i2];
        if (isObject(obj)) {
          assign(o2, obj);
        }
      }
      return o2;
    };
    function assign(a2, b2) {
      for (var key in b2) {
        if (hasOwn(b2, key)) {
          a2[key] = b2[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/.pnpm/section-matter@1.0.0/node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/.pnpm/section-matter@1.0.0/node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i2 = 0; i2 < lines.length; i2++) {
        var line = lines[i2];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i2 !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence))
        return sequence;
      else if (isNothing(sequence))
        return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer)
        return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null)
        return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null)
        return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c2) {
      return 48 <= c2 && c2 <= 57 || 65 <= c2 && c2 <= 70 || 97 <= c2 && c2 <= 102;
    }
    function isOctCode(c2) {
      return 48 <= c2 && c2 <= 55;
    }
    function isDecCode(c2) {
      return 48 <= c2 && c2 <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null)
        return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max)
        return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max)
          return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (ch !== "0" && ch !== "1")
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (!isHexCode(data.charCodeAt(index)))
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_")
        return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch === ":")
          break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_")
        return false;
      if (ch !== ":")
        return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-")
          sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0")
        return 0;
      if (ch === "0") {
        if (value[1] === "b")
          return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x")
          return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null)
        return false;
      if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json2 = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json2()
      ]
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null)
        return false;
      if (YAML_DATE_REGEXP.exec(data) !== null)
        return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
        return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null)
        match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null)
        throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-")
          delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta)
        date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = __require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null)
        return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64)
          continue;
        if (code < 0)
          return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null)
        return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]")
          return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey)
              pairHasKey = true;
            else
              return false;
          }
        }
        if (!pairHasKey)
          return false;
        if (objectKeys.indexOf(pairKey) === -1)
          objectKeys.push(pairKey);
        else
          return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null)
        return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]")
          return false;
        keys = Object.keys(pair);
        if (keys.length !== 1)
          return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null)
        return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null)
        return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null)
            return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null)
        return false;
      if (data.length === 0)
        return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        if (modifiers.length > 3)
          return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/")
          return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global)
        result += "g";
      if (object.multiline)
        result += "m";
      if (object.ignoreCase)
        result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = __require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined")
        esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null)
        return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction2(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction2,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c2) {
      return c2 === 10 || c2 === 13;
    }
    function is_WHITE_SPACE(c2) {
      return c2 === 9 || c2 === 32;
    }
    function is_WS_OR_EOL(c2) {
      return c2 === 9 || c2 === 32 || c2 === 10 || c2 === 13;
    }
    function is_FLOW_INDICATOR(c2) {
      return c2 === 44 || c2 === 91 || c2 === 93 || c2 === 123 || c2 === 125;
    }
    function fromHexCode(c2) {
      var lc;
      if (48 <= c2 && c2 <= 57) {
        return c2 - 48;
      }
      lc = c2 | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c2) {
      if (c2 === 120) {
        return 2;
      }
      if (c2 === 117) {
        return 4;
      }
      if (c2 === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c2) {
      if (48 <= c2 && c2 <= 57) {
        return c2 - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c2) {
      return c2 === 48 ? "\0" : c2 === 97 ? "\x07" : c2 === 98 ? "\b" : c2 === 116 ? "	" : c2 === 9 ? "	" : c2 === 110 ? "\n" : c2 === 118 ? "\v" : c2 === 102 ? "\f" : c2 === 114 ? "\r" : c2 === 101 ? "\x1B" : c2 === 32 ? " " : c2 === 34 ? '"' : c2 === 47 ? "/" : c2 === 92 ? "\\" : c2 === 78 ? "\x85" : c2 === 95 ? "\xA0" : c2 === 76 ? "\u2028" : c2 === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c2) {
      if (c2 <= 65535) {
        return String.fromCharCode(c2);
      }
      return String.fromCharCode(
        (c2 - 65536 >> 10) + 55296,
        (c2 - 65536 & 1023) + 56320
      );
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i2 = 0; i2 < 256; i2++) {
      simpleEscapeCheck[i2] = simpleEscapeSequence(i2) ? 1 : 0;
      simpleEscapeMap[i2] = simpleEscapeSequence(i2);
    }
    var i2;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33)
        return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38)
        return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42)
        return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch))
            break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0)
          readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null)
        return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n")
          result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c2) {
      return c2 === CHAR_SPACE || c2 === CHAR_TAB;
    }
    function isPrintable(c2) {
      return 32 <= c2 && c2 <= 126 || 161 <= c2 && c2 <= 55295 && c2 !== 8232 && c2 !== 8233 || 57344 <= c2 && c2 <= 65533 && c2 !== 65279 || 65536 <= c2 && c2 <= 1114111;
    }
    function isNsChar(c2) {
      return isPrintable(c2) && !isWhitespace(c2) && c2 !== 65279 && c2 !== CHAR_CARRIAGE_RETURN && c2 !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c2, prev) {
      return isPrintable(c2) && c2 !== 65279 && c2 !== CHAR_COMMA && c2 !== CHAR_LEFT_SQUARE_BRACKET && c2 !== CHAR_RIGHT_SQUARE_BRACKET && c2 !== CHAR_LEFT_CURLY_BRACKET && c2 !== CHAR_RIGHT_CURLY_BRACKET && c2 !== CHAR_COLON && (c2 !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c2) {
      return isPrintable(c2) && c2 !== 65279 && !isWhitespace(c2) && c2 !== CHAR_MINUS && c2 !== CHAR_QUESTION && c2 !== CHAR_COLON && c2 !== CHAR_COMMA && c2 !== CHAR_LEFT_SQUARE_BRACKET && c2 !== CHAR_RIGHT_SQUARE_BRACKET && c2 !== CHAR_LEFT_CURLY_BRACKET && c2 !== CHAR_RIGHT_CURLY_BRACKET && c2 !== CHAR_SHARP && c2 !== CHAR_AMPERSAND && c2 !== CHAR_ASTERISK && c2 !== CHAR_EXCLAMATION && c2 !== CHAR_VERTICAL_LINE && c2 !== CHAR_EQUALS && c2 !== CHAR_GREATER_THAN && c2 !== CHAR_SINGLE_QUOTE && c2 !== CHAR_DOUBLE_QUOTE && c2 !== CHAR_PERCENT && c2 !== CHAR_COMMERCIAL_AT && c2 !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i2;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i2 = 0; i2 < string.length; i2++) {
          char = string.charCodeAt(i2);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i2 > 0 ? string.charCodeAt(i2 - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i2 = 0; i2 < string.length; i2++) {
          char = string.charCodeAt(i2);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i2;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i2 > 0 ? string.charCodeAt(i2 - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ")
        return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i2 = 0; i2 < string.length; i2++) {
        char = string.charCodeAt(i2);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i2 + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i2++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i2] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0)
            _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0)
          pairBuffer += ", ";
        if (state.condenseFlow)
          pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024)
          pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid)
            return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs)
        getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true))
        return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json2();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/.pnpm/js-yaml@3.14.1/node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/.pnpm/strip-bom-string@1.0.0/node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/.pnpm/strip-bom-string@1.0.0/node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/utils.js
var require_utils4 = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input))
        return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number")
        len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils4();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data)
          return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter !== "{}") {
        buf = newline(open) + newline(matter) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils4();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs4 = require_fs();
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse2();
    var utils = require_utils4();
    function matter(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter.engines = engines2;
    matter.stringify = function(file, data, options2) {
      if (typeof file === "string")
        file = matter(file, options2);
      return stringify(file, data, options2);
    };
    matter.read = function(filepath, options2) {
      const str2 = fs4.readFileSync(filepath, "utf8");
      const file = matter(str2, options2);
      file.path = filepath;
      return file;
    };
    matter.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter.cache = {};
    matter.clearCache = function() {
      matter.cache = {};
    };
    module2.exports = matter;
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/data/full.json
var require_full = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/data/full.json"(exports2, module2) {
    module2.exports = {
      "100": "\u{1F4AF}",
      "1234": "\u{1F522}",
      grinning: "\u{1F600}",
      smiley: "\u{1F603}",
      smile: "\u{1F604}",
      grin: "\u{1F601}",
      laughing: "\u{1F606}",
      satisfied: "\u{1F606}",
      sweat_smile: "\u{1F605}",
      rofl: "\u{1F923}",
      joy: "\u{1F602}",
      slightly_smiling_face: "\u{1F642}",
      upside_down_face: "\u{1F643}",
      wink: "\u{1F609}",
      blush: "\u{1F60A}",
      innocent: "\u{1F607}",
      smiling_face_with_three_hearts: "\u{1F970}",
      heart_eyes: "\u{1F60D}",
      star_struck: "\u{1F929}",
      kissing_heart: "\u{1F618}",
      kissing: "\u{1F617}",
      relaxed: "\u263A\uFE0F",
      kissing_closed_eyes: "\u{1F61A}",
      kissing_smiling_eyes: "\u{1F619}",
      smiling_face_with_tear: "\u{1F972}",
      yum: "\u{1F60B}",
      stuck_out_tongue: "\u{1F61B}",
      stuck_out_tongue_winking_eye: "\u{1F61C}",
      zany_face: "\u{1F92A}",
      stuck_out_tongue_closed_eyes: "\u{1F61D}",
      money_mouth_face: "\u{1F911}",
      hugs: "\u{1F917}",
      hand_over_mouth: "\u{1F92D}",
      shushing_face: "\u{1F92B}",
      thinking: "\u{1F914}",
      zipper_mouth_face: "\u{1F910}",
      raised_eyebrow: "\u{1F928}",
      neutral_face: "\u{1F610}",
      expressionless: "\u{1F611}",
      no_mouth: "\u{1F636}",
      smirk: "\u{1F60F}",
      unamused: "\u{1F612}",
      roll_eyes: "\u{1F644}",
      grimacing: "\u{1F62C}",
      lying_face: "\u{1F925}",
      relieved: "\u{1F60C}",
      pensive: "\u{1F614}",
      sleepy: "\u{1F62A}",
      drooling_face: "\u{1F924}",
      sleeping: "\u{1F634}",
      mask: "\u{1F637}",
      face_with_thermometer: "\u{1F912}",
      face_with_head_bandage: "\u{1F915}",
      nauseated_face: "\u{1F922}",
      vomiting_face: "\u{1F92E}",
      sneezing_face: "\u{1F927}",
      hot_face: "\u{1F975}",
      cold_face: "\u{1F976}",
      woozy_face: "\u{1F974}",
      dizzy_face: "\u{1F635}",
      exploding_head: "\u{1F92F}",
      cowboy_hat_face: "\u{1F920}",
      partying_face: "\u{1F973}",
      disguised_face: "\u{1F978}",
      sunglasses: "\u{1F60E}",
      nerd_face: "\u{1F913}",
      monocle_face: "\u{1F9D0}",
      confused: "\u{1F615}",
      worried: "\u{1F61F}",
      slightly_frowning_face: "\u{1F641}",
      frowning_face: "\u2639\uFE0F",
      open_mouth: "\u{1F62E}",
      hushed: "\u{1F62F}",
      astonished: "\u{1F632}",
      flushed: "\u{1F633}",
      pleading_face: "\u{1F97A}",
      frowning: "\u{1F626}",
      anguished: "\u{1F627}",
      fearful: "\u{1F628}",
      cold_sweat: "\u{1F630}",
      disappointed_relieved: "\u{1F625}",
      cry: "\u{1F622}",
      sob: "\u{1F62D}",
      scream: "\u{1F631}",
      confounded: "\u{1F616}",
      persevere: "\u{1F623}",
      disappointed: "\u{1F61E}",
      sweat: "\u{1F613}",
      weary: "\u{1F629}",
      tired_face: "\u{1F62B}",
      yawning_face: "\u{1F971}",
      triumph: "\u{1F624}",
      rage: "\u{1F621}",
      pout: "\u{1F621}",
      angry: "\u{1F620}",
      cursing_face: "\u{1F92C}",
      smiling_imp: "\u{1F608}",
      imp: "\u{1F47F}",
      skull: "\u{1F480}",
      skull_and_crossbones: "\u2620\uFE0F",
      hankey: "\u{1F4A9}",
      poop: "\u{1F4A9}",
      shit: "\u{1F4A9}",
      clown_face: "\u{1F921}",
      japanese_ogre: "\u{1F479}",
      japanese_goblin: "\u{1F47A}",
      ghost: "\u{1F47B}",
      alien: "\u{1F47D}",
      space_invader: "\u{1F47E}",
      robot: "\u{1F916}",
      smiley_cat: "\u{1F63A}",
      smile_cat: "\u{1F638}",
      joy_cat: "\u{1F639}",
      heart_eyes_cat: "\u{1F63B}",
      smirk_cat: "\u{1F63C}",
      kissing_cat: "\u{1F63D}",
      scream_cat: "\u{1F640}",
      crying_cat_face: "\u{1F63F}",
      pouting_cat: "\u{1F63E}",
      see_no_evil: "\u{1F648}",
      hear_no_evil: "\u{1F649}",
      speak_no_evil: "\u{1F64A}",
      kiss: "\u{1F48B}",
      love_letter: "\u{1F48C}",
      cupid: "\u{1F498}",
      gift_heart: "\u{1F49D}",
      sparkling_heart: "\u{1F496}",
      heartpulse: "\u{1F497}",
      heartbeat: "\u{1F493}",
      revolving_hearts: "\u{1F49E}",
      two_hearts: "\u{1F495}",
      heart_decoration: "\u{1F49F}",
      heavy_heart_exclamation: "\u2763\uFE0F",
      broken_heart: "\u{1F494}",
      heart: "\u2764\uFE0F",
      orange_heart: "\u{1F9E1}",
      yellow_heart: "\u{1F49B}",
      green_heart: "\u{1F49A}",
      blue_heart: "\u{1F499}",
      purple_heart: "\u{1F49C}",
      brown_heart: "\u{1F90E}",
      black_heart: "\u{1F5A4}",
      white_heart: "\u{1F90D}",
      anger: "\u{1F4A2}",
      boom: "\u{1F4A5}",
      collision: "\u{1F4A5}",
      dizzy: "\u{1F4AB}",
      sweat_drops: "\u{1F4A6}",
      dash: "\u{1F4A8}",
      hole: "\u{1F573}\uFE0F",
      bomb: "\u{1F4A3}",
      speech_balloon: "\u{1F4AC}",
      eye_speech_bubble: "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F",
      left_speech_bubble: "\u{1F5E8}\uFE0F",
      right_anger_bubble: "\u{1F5EF}\uFE0F",
      thought_balloon: "\u{1F4AD}",
      zzz: "\u{1F4A4}",
      wave: "\u{1F44B}",
      raised_back_of_hand: "\u{1F91A}",
      raised_hand_with_fingers_splayed: "\u{1F590}\uFE0F",
      hand: "\u270B",
      raised_hand: "\u270B",
      vulcan_salute: "\u{1F596}",
      ok_hand: "\u{1F44C}",
      pinched_fingers: "\u{1F90C}",
      pinching_hand: "\u{1F90F}",
      v: "\u270C\uFE0F",
      crossed_fingers: "\u{1F91E}",
      love_you_gesture: "\u{1F91F}",
      metal: "\u{1F918}",
      call_me_hand: "\u{1F919}",
      point_left: "\u{1F448}",
      point_right: "\u{1F449}",
      point_up_2: "\u{1F446}",
      middle_finger: "\u{1F595}",
      fu: "\u{1F595}",
      point_down: "\u{1F447}",
      point_up: "\u261D\uFE0F",
      "+1": "\u{1F44D}",
      thumbsup: "\u{1F44D}",
      "-1": "\u{1F44E}",
      thumbsdown: "\u{1F44E}",
      fist_raised: "\u270A",
      fist: "\u270A",
      fist_oncoming: "\u{1F44A}",
      facepunch: "\u{1F44A}",
      punch: "\u{1F44A}",
      fist_left: "\u{1F91B}",
      fist_right: "\u{1F91C}",
      clap: "\u{1F44F}",
      raised_hands: "\u{1F64C}",
      open_hands: "\u{1F450}",
      palms_up_together: "\u{1F932}",
      handshake: "\u{1F91D}",
      pray: "\u{1F64F}",
      writing_hand: "\u270D\uFE0F",
      nail_care: "\u{1F485}",
      selfie: "\u{1F933}",
      muscle: "\u{1F4AA}",
      mechanical_arm: "\u{1F9BE}",
      mechanical_leg: "\u{1F9BF}",
      leg: "\u{1F9B5}",
      foot: "\u{1F9B6}",
      ear: "\u{1F442}",
      ear_with_hearing_aid: "\u{1F9BB}",
      nose: "\u{1F443}",
      brain: "\u{1F9E0}",
      anatomical_heart: "\u{1FAC0}",
      lungs: "\u{1FAC1}",
      tooth: "\u{1F9B7}",
      bone: "\u{1F9B4}",
      eyes: "\u{1F440}",
      eye: "\u{1F441}\uFE0F",
      tongue: "\u{1F445}",
      lips: "\u{1F444}",
      baby: "\u{1F476}",
      child: "\u{1F9D2}",
      boy: "\u{1F466}",
      girl: "\u{1F467}",
      adult: "\u{1F9D1}",
      blond_haired_person: "\u{1F471}",
      man: "\u{1F468}",
      bearded_person: "\u{1F9D4}",
      red_haired_man: "\u{1F468}\u200D\u{1F9B0}",
      curly_haired_man: "\u{1F468}\u200D\u{1F9B1}",
      white_haired_man: "\u{1F468}\u200D\u{1F9B3}",
      bald_man: "\u{1F468}\u200D\u{1F9B2}",
      woman: "\u{1F469}",
      red_haired_woman: "\u{1F469}\u200D\u{1F9B0}",
      person_red_hair: "\u{1F9D1}\u200D\u{1F9B0}",
      curly_haired_woman: "\u{1F469}\u200D\u{1F9B1}",
      person_curly_hair: "\u{1F9D1}\u200D\u{1F9B1}",
      white_haired_woman: "\u{1F469}\u200D\u{1F9B3}",
      person_white_hair: "\u{1F9D1}\u200D\u{1F9B3}",
      bald_woman: "\u{1F469}\u200D\u{1F9B2}",
      person_bald: "\u{1F9D1}\u200D\u{1F9B2}",
      blond_haired_woman: "\u{1F471}\u200D\u2640\uFE0F",
      blonde_woman: "\u{1F471}\u200D\u2640\uFE0F",
      blond_haired_man: "\u{1F471}\u200D\u2642\uFE0F",
      older_adult: "\u{1F9D3}",
      older_man: "\u{1F474}",
      older_woman: "\u{1F475}",
      frowning_person: "\u{1F64D}",
      frowning_man: "\u{1F64D}\u200D\u2642\uFE0F",
      frowning_woman: "\u{1F64D}\u200D\u2640\uFE0F",
      pouting_face: "\u{1F64E}",
      pouting_man: "\u{1F64E}\u200D\u2642\uFE0F",
      pouting_woman: "\u{1F64E}\u200D\u2640\uFE0F",
      no_good: "\u{1F645}",
      no_good_man: "\u{1F645}\u200D\u2642\uFE0F",
      ng_man: "\u{1F645}\u200D\u2642\uFE0F",
      no_good_woman: "\u{1F645}\u200D\u2640\uFE0F",
      ng_woman: "\u{1F645}\u200D\u2640\uFE0F",
      ok_person: "\u{1F646}",
      ok_man: "\u{1F646}\u200D\u2642\uFE0F",
      ok_woman: "\u{1F646}\u200D\u2640\uFE0F",
      tipping_hand_person: "\u{1F481}",
      information_desk_person: "\u{1F481}",
      tipping_hand_man: "\u{1F481}\u200D\u2642\uFE0F",
      sassy_man: "\u{1F481}\u200D\u2642\uFE0F",
      tipping_hand_woman: "\u{1F481}\u200D\u2640\uFE0F",
      sassy_woman: "\u{1F481}\u200D\u2640\uFE0F",
      raising_hand: "\u{1F64B}",
      raising_hand_man: "\u{1F64B}\u200D\u2642\uFE0F",
      raising_hand_woman: "\u{1F64B}\u200D\u2640\uFE0F",
      deaf_person: "\u{1F9CF}",
      deaf_man: "\u{1F9CF}\u200D\u2642\uFE0F",
      deaf_woman: "\u{1F9CF}\u200D\u2640\uFE0F",
      bow: "\u{1F647}",
      bowing_man: "\u{1F647}\u200D\u2642\uFE0F",
      bowing_woman: "\u{1F647}\u200D\u2640\uFE0F",
      facepalm: "\u{1F926}",
      man_facepalming: "\u{1F926}\u200D\u2642\uFE0F",
      woman_facepalming: "\u{1F926}\u200D\u2640\uFE0F",
      shrug: "\u{1F937}",
      man_shrugging: "\u{1F937}\u200D\u2642\uFE0F",
      woman_shrugging: "\u{1F937}\u200D\u2640\uFE0F",
      health_worker: "\u{1F9D1}\u200D\u2695\uFE0F",
      man_health_worker: "\u{1F468}\u200D\u2695\uFE0F",
      woman_health_worker: "\u{1F469}\u200D\u2695\uFE0F",
      student: "\u{1F9D1}\u200D\u{1F393}",
      man_student: "\u{1F468}\u200D\u{1F393}",
      woman_student: "\u{1F469}\u200D\u{1F393}",
      teacher: "\u{1F9D1}\u200D\u{1F3EB}",
      man_teacher: "\u{1F468}\u200D\u{1F3EB}",
      woman_teacher: "\u{1F469}\u200D\u{1F3EB}",
      judge: "\u{1F9D1}\u200D\u2696\uFE0F",
      man_judge: "\u{1F468}\u200D\u2696\uFE0F",
      woman_judge: "\u{1F469}\u200D\u2696\uFE0F",
      farmer: "\u{1F9D1}\u200D\u{1F33E}",
      man_farmer: "\u{1F468}\u200D\u{1F33E}",
      woman_farmer: "\u{1F469}\u200D\u{1F33E}",
      cook: "\u{1F9D1}\u200D\u{1F373}",
      man_cook: "\u{1F468}\u200D\u{1F373}",
      woman_cook: "\u{1F469}\u200D\u{1F373}",
      mechanic: "\u{1F9D1}\u200D\u{1F527}",
      man_mechanic: "\u{1F468}\u200D\u{1F527}",
      woman_mechanic: "\u{1F469}\u200D\u{1F527}",
      factory_worker: "\u{1F9D1}\u200D\u{1F3ED}",
      man_factory_worker: "\u{1F468}\u200D\u{1F3ED}",
      woman_factory_worker: "\u{1F469}\u200D\u{1F3ED}",
      office_worker: "\u{1F9D1}\u200D\u{1F4BC}",
      man_office_worker: "\u{1F468}\u200D\u{1F4BC}",
      woman_office_worker: "\u{1F469}\u200D\u{1F4BC}",
      scientist: "\u{1F9D1}\u200D\u{1F52C}",
      man_scientist: "\u{1F468}\u200D\u{1F52C}",
      woman_scientist: "\u{1F469}\u200D\u{1F52C}",
      technologist: "\u{1F9D1}\u200D\u{1F4BB}",
      man_technologist: "\u{1F468}\u200D\u{1F4BB}",
      woman_technologist: "\u{1F469}\u200D\u{1F4BB}",
      singer: "\u{1F9D1}\u200D\u{1F3A4}",
      man_singer: "\u{1F468}\u200D\u{1F3A4}",
      woman_singer: "\u{1F469}\u200D\u{1F3A4}",
      artist: "\u{1F9D1}\u200D\u{1F3A8}",
      man_artist: "\u{1F468}\u200D\u{1F3A8}",
      woman_artist: "\u{1F469}\u200D\u{1F3A8}",
      pilot: "\u{1F9D1}\u200D\u2708\uFE0F",
      man_pilot: "\u{1F468}\u200D\u2708\uFE0F",
      woman_pilot: "\u{1F469}\u200D\u2708\uFE0F",
      astronaut: "\u{1F9D1}\u200D\u{1F680}",
      man_astronaut: "\u{1F468}\u200D\u{1F680}",
      woman_astronaut: "\u{1F469}\u200D\u{1F680}",
      firefighter: "\u{1F9D1}\u200D\u{1F692}",
      man_firefighter: "\u{1F468}\u200D\u{1F692}",
      woman_firefighter: "\u{1F469}\u200D\u{1F692}",
      police_officer: "\u{1F46E}",
      cop: "\u{1F46E}",
      policeman: "\u{1F46E}\u200D\u2642\uFE0F",
      policewoman: "\u{1F46E}\u200D\u2640\uFE0F",
      detective: "\u{1F575}\uFE0F",
      male_detective: "\u{1F575}\uFE0F\u200D\u2642\uFE0F",
      female_detective: "\u{1F575}\uFE0F\u200D\u2640\uFE0F",
      guard: "\u{1F482}",
      guardsman: "\u{1F482}\u200D\u2642\uFE0F",
      guardswoman: "\u{1F482}\u200D\u2640\uFE0F",
      ninja: "\u{1F977}",
      construction_worker: "\u{1F477}",
      construction_worker_man: "\u{1F477}\u200D\u2642\uFE0F",
      construction_worker_woman: "\u{1F477}\u200D\u2640\uFE0F",
      prince: "\u{1F934}",
      princess: "\u{1F478}",
      person_with_turban: "\u{1F473}",
      man_with_turban: "\u{1F473}\u200D\u2642\uFE0F",
      woman_with_turban: "\u{1F473}\u200D\u2640\uFE0F",
      man_with_gua_pi_mao: "\u{1F472}",
      woman_with_headscarf: "\u{1F9D5}",
      person_in_tuxedo: "\u{1F935}",
      man_in_tuxedo: "\u{1F935}\u200D\u2642\uFE0F",
      woman_in_tuxedo: "\u{1F935}\u200D\u2640\uFE0F",
      person_with_veil: "\u{1F470}",
      man_with_veil: "\u{1F470}\u200D\u2642\uFE0F",
      woman_with_veil: "\u{1F470}\u200D\u2640\uFE0F",
      bride_with_veil: "\u{1F470}\u200D\u2640\uFE0F",
      pregnant_woman: "\u{1F930}",
      breast_feeding: "\u{1F931}",
      woman_feeding_baby: "\u{1F469}\u200D\u{1F37C}",
      man_feeding_baby: "\u{1F468}\u200D\u{1F37C}",
      person_feeding_baby: "\u{1F9D1}\u200D\u{1F37C}",
      angel: "\u{1F47C}",
      santa: "\u{1F385}",
      mrs_claus: "\u{1F936}",
      mx_claus: "\u{1F9D1}\u200D\u{1F384}",
      superhero: "\u{1F9B8}",
      superhero_man: "\u{1F9B8}\u200D\u2642\uFE0F",
      superhero_woman: "\u{1F9B8}\u200D\u2640\uFE0F",
      supervillain: "\u{1F9B9}",
      supervillain_man: "\u{1F9B9}\u200D\u2642\uFE0F",
      supervillain_woman: "\u{1F9B9}\u200D\u2640\uFE0F",
      mage: "\u{1F9D9}",
      mage_man: "\u{1F9D9}\u200D\u2642\uFE0F",
      mage_woman: "\u{1F9D9}\u200D\u2640\uFE0F",
      fairy: "\u{1F9DA}",
      fairy_man: "\u{1F9DA}\u200D\u2642\uFE0F",
      fairy_woman: "\u{1F9DA}\u200D\u2640\uFE0F",
      vampire: "\u{1F9DB}",
      vampire_man: "\u{1F9DB}\u200D\u2642\uFE0F",
      vampire_woman: "\u{1F9DB}\u200D\u2640\uFE0F",
      merperson: "\u{1F9DC}",
      merman: "\u{1F9DC}\u200D\u2642\uFE0F",
      mermaid: "\u{1F9DC}\u200D\u2640\uFE0F",
      elf: "\u{1F9DD}",
      elf_man: "\u{1F9DD}\u200D\u2642\uFE0F",
      elf_woman: "\u{1F9DD}\u200D\u2640\uFE0F",
      genie: "\u{1F9DE}",
      genie_man: "\u{1F9DE}\u200D\u2642\uFE0F",
      genie_woman: "\u{1F9DE}\u200D\u2640\uFE0F",
      zombie: "\u{1F9DF}",
      zombie_man: "\u{1F9DF}\u200D\u2642\uFE0F",
      zombie_woman: "\u{1F9DF}\u200D\u2640\uFE0F",
      massage: "\u{1F486}",
      massage_man: "\u{1F486}\u200D\u2642\uFE0F",
      massage_woman: "\u{1F486}\u200D\u2640\uFE0F",
      haircut: "\u{1F487}",
      haircut_man: "\u{1F487}\u200D\u2642\uFE0F",
      haircut_woman: "\u{1F487}\u200D\u2640\uFE0F",
      walking: "\u{1F6B6}",
      walking_man: "\u{1F6B6}\u200D\u2642\uFE0F",
      walking_woman: "\u{1F6B6}\u200D\u2640\uFE0F",
      standing_person: "\u{1F9CD}",
      standing_man: "\u{1F9CD}\u200D\u2642\uFE0F",
      standing_woman: "\u{1F9CD}\u200D\u2640\uFE0F",
      kneeling_person: "\u{1F9CE}",
      kneeling_man: "\u{1F9CE}\u200D\u2642\uFE0F",
      kneeling_woman: "\u{1F9CE}\u200D\u2640\uFE0F",
      person_with_probing_cane: "\u{1F9D1}\u200D\u{1F9AF}",
      man_with_probing_cane: "\u{1F468}\u200D\u{1F9AF}",
      woman_with_probing_cane: "\u{1F469}\u200D\u{1F9AF}",
      person_in_motorized_wheelchair: "\u{1F9D1}\u200D\u{1F9BC}",
      man_in_motorized_wheelchair: "\u{1F468}\u200D\u{1F9BC}",
      woman_in_motorized_wheelchair: "\u{1F469}\u200D\u{1F9BC}",
      person_in_manual_wheelchair: "\u{1F9D1}\u200D\u{1F9BD}",
      man_in_manual_wheelchair: "\u{1F468}\u200D\u{1F9BD}",
      woman_in_manual_wheelchair: "\u{1F469}\u200D\u{1F9BD}",
      runner: "\u{1F3C3}",
      running: "\u{1F3C3}",
      running_man: "\u{1F3C3}\u200D\u2642\uFE0F",
      running_woman: "\u{1F3C3}\u200D\u2640\uFE0F",
      woman_dancing: "\u{1F483}",
      dancer: "\u{1F483}",
      man_dancing: "\u{1F57A}",
      business_suit_levitating: "\u{1F574}\uFE0F",
      dancers: "\u{1F46F}",
      dancing_men: "\u{1F46F}\u200D\u2642\uFE0F",
      dancing_women: "\u{1F46F}\u200D\u2640\uFE0F",
      sauna_person: "\u{1F9D6}",
      sauna_man: "\u{1F9D6}\u200D\u2642\uFE0F",
      sauna_woman: "\u{1F9D6}\u200D\u2640\uFE0F",
      climbing: "\u{1F9D7}",
      climbing_man: "\u{1F9D7}\u200D\u2642\uFE0F",
      climbing_woman: "\u{1F9D7}\u200D\u2640\uFE0F",
      person_fencing: "\u{1F93A}",
      horse_racing: "\u{1F3C7}",
      skier: "\u26F7\uFE0F",
      snowboarder: "\u{1F3C2}",
      golfing: "\u{1F3CC}\uFE0F",
      golfing_man: "\u{1F3CC}\uFE0F\u200D\u2642\uFE0F",
      golfing_woman: "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",
      surfer: "\u{1F3C4}",
      surfing_man: "\u{1F3C4}\u200D\u2642\uFE0F",
      surfing_woman: "\u{1F3C4}\u200D\u2640\uFE0F",
      rowboat: "\u{1F6A3}",
      rowing_man: "\u{1F6A3}\u200D\u2642\uFE0F",
      rowing_woman: "\u{1F6A3}\u200D\u2640\uFE0F",
      swimmer: "\u{1F3CA}",
      swimming_man: "\u{1F3CA}\u200D\u2642\uFE0F",
      swimming_woman: "\u{1F3CA}\u200D\u2640\uFE0F",
      bouncing_ball_person: "\u26F9\uFE0F",
      bouncing_ball_man: "\u26F9\uFE0F\u200D\u2642\uFE0F",
      basketball_man: "\u26F9\uFE0F\u200D\u2642\uFE0F",
      bouncing_ball_woman: "\u26F9\uFE0F\u200D\u2640\uFE0F",
      basketball_woman: "\u26F9\uFE0F\u200D\u2640\uFE0F",
      weight_lifting: "\u{1F3CB}\uFE0F",
      weight_lifting_man: "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F",
      weight_lifting_woman: "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",
      bicyclist: "\u{1F6B4}",
      biking_man: "\u{1F6B4}\u200D\u2642\uFE0F",
      biking_woman: "\u{1F6B4}\u200D\u2640\uFE0F",
      mountain_bicyclist: "\u{1F6B5}",
      mountain_biking_man: "\u{1F6B5}\u200D\u2642\uFE0F",
      mountain_biking_woman: "\u{1F6B5}\u200D\u2640\uFE0F",
      cartwheeling: "\u{1F938}",
      man_cartwheeling: "\u{1F938}\u200D\u2642\uFE0F",
      woman_cartwheeling: "\u{1F938}\u200D\u2640\uFE0F",
      wrestling: "\u{1F93C}",
      men_wrestling: "\u{1F93C}\u200D\u2642\uFE0F",
      women_wrestling: "\u{1F93C}\u200D\u2640\uFE0F",
      water_polo: "\u{1F93D}",
      man_playing_water_polo: "\u{1F93D}\u200D\u2642\uFE0F",
      woman_playing_water_polo: "\u{1F93D}\u200D\u2640\uFE0F",
      handball_person: "\u{1F93E}",
      man_playing_handball: "\u{1F93E}\u200D\u2642\uFE0F",
      woman_playing_handball: "\u{1F93E}\u200D\u2640\uFE0F",
      juggling_person: "\u{1F939}",
      man_juggling: "\u{1F939}\u200D\u2642\uFE0F",
      woman_juggling: "\u{1F939}\u200D\u2640\uFE0F",
      lotus_position: "\u{1F9D8}",
      lotus_position_man: "\u{1F9D8}\u200D\u2642\uFE0F",
      lotus_position_woman: "\u{1F9D8}\u200D\u2640\uFE0F",
      bath: "\u{1F6C0}",
      sleeping_bed: "\u{1F6CC}",
      people_holding_hands: "\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}",
      two_women_holding_hands: "\u{1F46D}",
      couple: "\u{1F46B}",
      two_men_holding_hands: "\u{1F46C}",
      couplekiss: "\u{1F48F}",
      couplekiss_man_woman: "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",
      couplekiss_man_man: "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",
      couplekiss_woman_woman: "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}",
      couple_with_heart: "\u{1F491}",
      couple_with_heart_woman_man: "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F468}",
      couple_with_heart_man_man: "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}",
      couple_with_heart_woman_woman: "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}",
      family: "\u{1F46A}",
      family_man_woman_boy: "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}",
      family_man_woman_girl: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
      family_man_woman_girl_boy: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
      family_man_woman_boy_boy: "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
      family_man_woman_girl_girl: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
      family_man_man_boy: "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}",
      family_man_man_girl: "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}",
      family_man_man_girl_boy: "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
      family_man_man_boy_boy: "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
      family_man_man_girl_girl: "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
      family_woman_woman_boy: "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}",
      family_woman_woman_girl: "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}",
      family_woman_woman_girl_boy: "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
      family_woman_woman_boy_boy: "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
      family_woman_woman_girl_girl: "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
      family_man_boy: "\u{1F468}\u200D\u{1F466}",
      family_man_boy_boy: "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
      family_man_girl: "\u{1F468}\u200D\u{1F467}",
      family_man_girl_boy: "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
      family_man_girl_girl: "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
      family_woman_boy: "\u{1F469}\u200D\u{1F466}",
      family_woman_boy_boy: "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
      family_woman_girl: "\u{1F469}\u200D\u{1F467}",
      family_woman_girl_boy: "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
      family_woman_girl_girl: "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
      speaking_head: "\u{1F5E3}\uFE0F",
      bust_in_silhouette: "\u{1F464}",
      busts_in_silhouette: "\u{1F465}",
      people_hugging: "\u{1FAC2}",
      footprints: "\u{1F463}",
      monkey_face: "\u{1F435}",
      monkey: "\u{1F412}",
      gorilla: "\u{1F98D}",
      orangutan: "\u{1F9A7}",
      dog: "\u{1F436}",
      dog2: "\u{1F415}",
      guide_dog: "\u{1F9AE}",
      service_dog: "\u{1F415}\u200D\u{1F9BA}",
      poodle: "\u{1F429}",
      wolf: "\u{1F43A}",
      fox_face: "\u{1F98A}",
      raccoon: "\u{1F99D}",
      cat: "\u{1F431}",
      cat2: "\u{1F408}",
      black_cat: "\u{1F408}\u200D\u2B1B",
      lion: "\u{1F981}",
      tiger: "\u{1F42F}",
      tiger2: "\u{1F405}",
      leopard: "\u{1F406}",
      horse: "\u{1F434}",
      racehorse: "\u{1F40E}",
      unicorn: "\u{1F984}",
      zebra: "\u{1F993}",
      deer: "\u{1F98C}",
      bison: "\u{1F9AC}",
      cow: "\u{1F42E}",
      ox: "\u{1F402}",
      water_buffalo: "\u{1F403}",
      cow2: "\u{1F404}",
      pig: "\u{1F437}",
      pig2: "\u{1F416}",
      boar: "\u{1F417}",
      pig_nose: "\u{1F43D}",
      ram: "\u{1F40F}",
      sheep: "\u{1F411}",
      goat: "\u{1F410}",
      dromedary_camel: "\u{1F42A}",
      camel: "\u{1F42B}",
      llama: "\u{1F999}",
      giraffe: "\u{1F992}",
      elephant: "\u{1F418}",
      mammoth: "\u{1F9A3}",
      rhinoceros: "\u{1F98F}",
      hippopotamus: "\u{1F99B}",
      mouse: "\u{1F42D}",
      mouse2: "\u{1F401}",
      rat: "\u{1F400}",
      hamster: "\u{1F439}",
      rabbit: "\u{1F430}",
      rabbit2: "\u{1F407}",
      chipmunk: "\u{1F43F}\uFE0F",
      beaver: "\u{1F9AB}",
      hedgehog: "\u{1F994}",
      bat: "\u{1F987}",
      bear: "\u{1F43B}",
      polar_bear: "\u{1F43B}\u200D\u2744\uFE0F",
      koala: "\u{1F428}",
      panda_face: "\u{1F43C}",
      sloth: "\u{1F9A5}",
      otter: "\u{1F9A6}",
      skunk: "\u{1F9A8}",
      kangaroo: "\u{1F998}",
      badger: "\u{1F9A1}",
      feet: "\u{1F43E}",
      paw_prints: "\u{1F43E}",
      turkey: "\u{1F983}",
      chicken: "\u{1F414}",
      rooster: "\u{1F413}",
      hatching_chick: "\u{1F423}",
      baby_chick: "\u{1F424}",
      hatched_chick: "\u{1F425}",
      bird: "\u{1F426}",
      penguin: "\u{1F427}",
      dove: "\u{1F54A}\uFE0F",
      eagle: "\u{1F985}",
      duck: "\u{1F986}",
      swan: "\u{1F9A2}",
      owl: "\u{1F989}",
      dodo: "\u{1F9A4}",
      feather: "\u{1FAB6}",
      flamingo: "\u{1F9A9}",
      peacock: "\u{1F99A}",
      parrot: "\u{1F99C}",
      frog: "\u{1F438}",
      crocodile: "\u{1F40A}",
      turtle: "\u{1F422}",
      lizard: "\u{1F98E}",
      snake: "\u{1F40D}",
      dragon_face: "\u{1F432}",
      dragon: "\u{1F409}",
      sauropod: "\u{1F995}",
      "t-rex": "\u{1F996}",
      whale: "\u{1F433}",
      whale2: "\u{1F40B}",
      dolphin: "\u{1F42C}",
      flipper: "\u{1F42C}",
      seal: "\u{1F9AD}",
      fish: "\u{1F41F}",
      tropical_fish: "\u{1F420}",
      blowfish: "\u{1F421}",
      shark: "\u{1F988}",
      octopus: "\u{1F419}",
      shell: "\u{1F41A}",
      snail: "\u{1F40C}",
      butterfly: "\u{1F98B}",
      bug: "\u{1F41B}",
      ant: "\u{1F41C}",
      bee: "\u{1F41D}",
      honeybee: "\u{1F41D}",
      beetle: "\u{1FAB2}",
      lady_beetle: "\u{1F41E}",
      cricket: "\u{1F997}",
      cockroach: "\u{1FAB3}",
      spider: "\u{1F577}\uFE0F",
      spider_web: "\u{1F578}\uFE0F",
      scorpion: "\u{1F982}",
      mosquito: "\u{1F99F}",
      fly: "\u{1FAB0}",
      worm: "\u{1FAB1}",
      microbe: "\u{1F9A0}",
      bouquet: "\u{1F490}",
      cherry_blossom: "\u{1F338}",
      white_flower: "\u{1F4AE}",
      rosette: "\u{1F3F5}\uFE0F",
      rose: "\u{1F339}",
      wilted_flower: "\u{1F940}",
      hibiscus: "\u{1F33A}",
      sunflower: "\u{1F33B}",
      blossom: "\u{1F33C}",
      tulip: "\u{1F337}",
      seedling: "\u{1F331}",
      potted_plant: "\u{1FAB4}",
      evergreen_tree: "\u{1F332}",
      deciduous_tree: "\u{1F333}",
      palm_tree: "\u{1F334}",
      cactus: "\u{1F335}",
      ear_of_rice: "\u{1F33E}",
      herb: "\u{1F33F}",
      shamrock: "\u2618\uFE0F",
      four_leaf_clover: "\u{1F340}",
      maple_leaf: "\u{1F341}",
      fallen_leaf: "\u{1F342}",
      leaves: "\u{1F343}",
      grapes: "\u{1F347}",
      melon: "\u{1F348}",
      watermelon: "\u{1F349}",
      tangerine: "\u{1F34A}",
      orange: "\u{1F34A}",
      mandarin: "\u{1F34A}",
      lemon: "\u{1F34B}",
      banana: "\u{1F34C}",
      pineapple: "\u{1F34D}",
      mango: "\u{1F96D}",
      apple: "\u{1F34E}",
      green_apple: "\u{1F34F}",
      pear: "\u{1F350}",
      peach: "\u{1F351}",
      cherries: "\u{1F352}",
      strawberry: "\u{1F353}",
      blueberries: "\u{1FAD0}",
      kiwi_fruit: "\u{1F95D}",
      tomato: "\u{1F345}",
      olive: "\u{1FAD2}",
      coconut: "\u{1F965}",
      avocado: "\u{1F951}",
      eggplant: "\u{1F346}",
      potato: "\u{1F954}",
      carrot: "\u{1F955}",
      corn: "\u{1F33D}",
      hot_pepper: "\u{1F336}\uFE0F",
      bell_pepper: "\u{1FAD1}",
      cucumber: "\u{1F952}",
      leafy_green: "\u{1F96C}",
      broccoli: "\u{1F966}",
      garlic: "\u{1F9C4}",
      onion: "\u{1F9C5}",
      mushroom: "\u{1F344}",
      peanuts: "\u{1F95C}",
      chestnut: "\u{1F330}",
      bread: "\u{1F35E}",
      croissant: "\u{1F950}",
      baguette_bread: "\u{1F956}",
      flatbread: "\u{1FAD3}",
      pretzel: "\u{1F968}",
      bagel: "\u{1F96F}",
      pancakes: "\u{1F95E}",
      waffle: "\u{1F9C7}",
      cheese: "\u{1F9C0}",
      meat_on_bone: "\u{1F356}",
      poultry_leg: "\u{1F357}",
      cut_of_meat: "\u{1F969}",
      bacon: "\u{1F953}",
      hamburger: "\u{1F354}",
      fries: "\u{1F35F}",
      pizza: "\u{1F355}",
      hotdog: "\u{1F32D}",
      sandwich: "\u{1F96A}",
      taco: "\u{1F32E}",
      burrito: "\u{1F32F}",
      tamale: "\u{1FAD4}",
      stuffed_flatbread: "\u{1F959}",
      falafel: "\u{1F9C6}",
      egg: "\u{1F95A}",
      fried_egg: "\u{1F373}",
      shallow_pan_of_food: "\u{1F958}",
      stew: "\u{1F372}",
      fondue: "\u{1FAD5}",
      bowl_with_spoon: "\u{1F963}",
      green_salad: "\u{1F957}",
      popcorn: "\u{1F37F}",
      butter: "\u{1F9C8}",
      salt: "\u{1F9C2}",
      canned_food: "\u{1F96B}",
      bento: "\u{1F371}",
      rice_cracker: "\u{1F358}",
      rice_ball: "\u{1F359}",
      rice: "\u{1F35A}",
      curry: "\u{1F35B}",
      ramen: "\u{1F35C}",
      spaghetti: "\u{1F35D}",
      sweet_potato: "\u{1F360}",
      oden: "\u{1F362}",
      sushi: "\u{1F363}",
      fried_shrimp: "\u{1F364}",
      fish_cake: "\u{1F365}",
      moon_cake: "\u{1F96E}",
      dango: "\u{1F361}",
      dumpling: "\u{1F95F}",
      fortune_cookie: "\u{1F960}",
      takeout_box: "\u{1F961}",
      crab: "\u{1F980}",
      lobster: "\u{1F99E}",
      shrimp: "\u{1F990}",
      squid: "\u{1F991}",
      oyster: "\u{1F9AA}",
      icecream: "\u{1F366}",
      shaved_ice: "\u{1F367}",
      ice_cream: "\u{1F368}",
      doughnut: "\u{1F369}",
      cookie: "\u{1F36A}",
      birthday: "\u{1F382}",
      cake: "\u{1F370}",
      cupcake: "\u{1F9C1}",
      pie: "\u{1F967}",
      chocolate_bar: "\u{1F36B}",
      candy: "\u{1F36C}",
      lollipop: "\u{1F36D}",
      custard: "\u{1F36E}",
      honey_pot: "\u{1F36F}",
      baby_bottle: "\u{1F37C}",
      milk_glass: "\u{1F95B}",
      coffee: "\u2615",
      teapot: "\u{1FAD6}",
      tea: "\u{1F375}",
      sake: "\u{1F376}",
      champagne: "\u{1F37E}",
      wine_glass: "\u{1F377}",
      cocktail: "\u{1F378}",
      tropical_drink: "\u{1F379}",
      beer: "\u{1F37A}",
      beers: "\u{1F37B}",
      clinking_glasses: "\u{1F942}",
      tumbler_glass: "\u{1F943}",
      cup_with_straw: "\u{1F964}",
      bubble_tea: "\u{1F9CB}",
      beverage_box: "\u{1F9C3}",
      mate: "\u{1F9C9}",
      ice_cube: "\u{1F9CA}",
      chopsticks: "\u{1F962}",
      plate_with_cutlery: "\u{1F37D}\uFE0F",
      fork_and_knife: "\u{1F374}",
      spoon: "\u{1F944}",
      hocho: "\u{1F52A}",
      knife: "\u{1F52A}",
      amphora: "\u{1F3FA}",
      earth_africa: "\u{1F30D}",
      earth_americas: "\u{1F30E}",
      earth_asia: "\u{1F30F}",
      globe_with_meridians: "\u{1F310}",
      world_map: "\u{1F5FA}\uFE0F",
      japan: "\u{1F5FE}",
      compass: "\u{1F9ED}",
      mountain_snow: "\u{1F3D4}\uFE0F",
      mountain: "\u26F0\uFE0F",
      volcano: "\u{1F30B}",
      mount_fuji: "\u{1F5FB}",
      camping: "\u{1F3D5}\uFE0F",
      beach_umbrella: "\u{1F3D6}\uFE0F",
      desert: "\u{1F3DC}\uFE0F",
      desert_island: "\u{1F3DD}\uFE0F",
      national_park: "\u{1F3DE}\uFE0F",
      stadium: "\u{1F3DF}\uFE0F",
      classical_building: "\u{1F3DB}\uFE0F",
      building_construction: "\u{1F3D7}\uFE0F",
      bricks: "\u{1F9F1}",
      rock: "\u{1FAA8}",
      wood: "\u{1FAB5}",
      hut: "\u{1F6D6}",
      houses: "\u{1F3D8}\uFE0F",
      derelict_house: "\u{1F3DA}\uFE0F",
      house: "\u{1F3E0}",
      house_with_garden: "\u{1F3E1}",
      office: "\u{1F3E2}",
      post_office: "\u{1F3E3}",
      european_post_office: "\u{1F3E4}",
      hospital: "\u{1F3E5}",
      bank: "\u{1F3E6}",
      hotel: "\u{1F3E8}",
      love_hotel: "\u{1F3E9}",
      convenience_store: "\u{1F3EA}",
      school: "\u{1F3EB}",
      department_store: "\u{1F3EC}",
      factory: "\u{1F3ED}",
      japanese_castle: "\u{1F3EF}",
      european_castle: "\u{1F3F0}",
      wedding: "\u{1F492}",
      tokyo_tower: "\u{1F5FC}",
      statue_of_liberty: "\u{1F5FD}",
      church: "\u26EA",
      mosque: "\u{1F54C}",
      hindu_temple: "\u{1F6D5}",
      synagogue: "\u{1F54D}",
      shinto_shrine: "\u26E9\uFE0F",
      kaaba: "\u{1F54B}",
      fountain: "\u26F2",
      tent: "\u26FA",
      foggy: "\u{1F301}",
      night_with_stars: "\u{1F303}",
      cityscape: "\u{1F3D9}\uFE0F",
      sunrise_over_mountains: "\u{1F304}",
      sunrise: "\u{1F305}",
      city_sunset: "\u{1F306}",
      city_sunrise: "\u{1F307}",
      bridge_at_night: "\u{1F309}",
      hotsprings: "\u2668\uFE0F",
      carousel_horse: "\u{1F3A0}",
      ferris_wheel: "\u{1F3A1}",
      roller_coaster: "\u{1F3A2}",
      barber: "\u{1F488}",
      circus_tent: "\u{1F3AA}",
      steam_locomotive: "\u{1F682}",
      railway_car: "\u{1F683}",
      bullettrain_side: "\u{1F684}",
      bullettrain_front: "\u{1F685}",
      train2: "\u{1F686}",
      metro: "\u{1F687}",
      light_rail: "\u{1F688}",
      station: "\u{1F689}",
      tram: "\u{1F68A}",
      monorail: "\u{1F69D}",
      mountain_railway: "\u{1F69E}",
      train: "\u{1F68B}",
      bus: "\u{1F68C}",
      oncoming_bus: "\u{1F68D}",
      trolleybus: "\u{1F68E}",
      minibus: "\u{1F690}",
      ambulance: "\u{1F691}",
      fire_engine: "\u{1F692}",
      police_car: "\u{1F693}",
      oncoming_police_car: "\u{1F694}",
      taxi: "\u{1F695}",
      oncoming_taxi: "\u{1F696}",
      car: "\u{1F697}",
      red_car: "\u{1F697}",
      oncoming_automobile: "\u{1F698}",
      blue_car: "\u{1F699}",
      pickup_truck: "\u{1F6FB}",
      truck: "\u{1F69A}",
      articulated_lorry: "\u{1F69B}",
      tractor: "\u{1F69C}",
      racing_car: "\u{1F3CE}\uFE0F",
      motorcycle: "\u{1F3CD}\uFE0F",
      motor_scooter: "\u{1F6F5}",
      manual_wheelchair: "\u{1F9BD}",
      motorized_wheelchair: "\u{1F9BC}",
      auto_rickshaw: "\u{1F6FA}",
      bike: "\u{1F6B2}",
      kick_scooter: "\u{1F6F4}",
      skateboard: "\u{1F6F9}",
      roller_skate: "\u{1F6FC}",
      busstop: "\u{1F68F}",
      motorway: "\u{1F6E3}\uFE0F",
      railway_track: "\u{1F6E4}\uFE0F",
      oil_drum: "\u{1F6E2}\uFE0F",
      fuelpump: "\u26FD",
      rotating_light: "\u{1F6A8}",
      traffic_light: "\u{1F6A5}",
      vertical_traffic_light: "\u{1F6A6}",
      stop_sign: "\u{1F6D1}",
      construction: "\u{1F6A7}",
      anchor: "\u2693",
      boat: "\u26F5",
      sailboat: "\u26F5",
      canoe: "\u{1F6F6}",
      speedboat: "\u{1F6A4}",
      passenger_ship: "\u{1F6F3}\uFE0F",
      ferry: "\u26F4\uFE0F",
      motor_boat: "\u{1F6E5}\uFE0F",
      ship: "\u{1F6A2}",
      airplane: "\u2708\uFE0F",
      small_airplane: "\u{1F6E9}\uFE0F",
      flight_departure: "\u{1F6EB}",
      flight_arrival: "\u{1F6EC}",
      parachute: "\u{1FA82}",
      seat: "\u{1F4BA}",
      helicopter: "\u{1F681}",
      suspension_railway: "\u{1F69F}",
      mountain_cableway: "\u{1F6A0}",
      aerial_tramway: "\u{1F6A1}",
      artificial_satellite: "\u{1F6F0}\uFE0F",
      rocket: "\u{1F680}",
      flying_saucer: "\u{1F6F8}",
      bellhop_bell: "\u{1F6CE}\uFE0F",
      luggage: "\u{1F9F3}",
      hourglass: "\u231B",
      hourglass_flowing_sand: "\u23F3",
      watch: "\u231A",
      alarm_clock: "\u23F0",
      stopwatch: "\u23F1\uFE0F",
      timer_clock: "\u23F2\uFE0F",
      mantelpiece_clock: "\u{1F570}\uFE0F",
      clock12: "\u{1F55B}",
      clock1230: "\u{1F567}",
      clock1: "\u{1F550}",
      clock130: "\u{1F55C}",
      clock2: "\u{1F551}",
      clock230: "\u{1F55D}",
      clock3: "\u{1F552}",
      clock330: "\u{1F55E}",
      clock4: "\u{1F553}",
      clock430: "\u{1F55F}",
      clock5: "\u{1F554}",
      clock530: "\u{1F560}",
      clock6: "\u{1F555}",
      clock630: "\u{1F561}",
      clock7: "\u{1F556}",
      clock730: "\u{1F562}",
      clock8: "\u{1F557}",
      clock830: "\u{1F563}",
      clock9: "\u{1F558}",
      clock930: "\u{1F564}",
      clock10: "\u{1F559}",
      clock1030: "\u{1F565}",
      clock11: "\u{1F55A}",
      clock1130: "\u{1F566}",
      new_moon: "\u{1F311}",
      waxing_crescent_moon: "\u{1F312}",
      first_quarter_moon: "\u{1F313}",
      moon: "\u{1F314}",
      waxing_gibbous_moon: "\u{1F314}",
      full_moon: "\u{1F315}",
      waning_gibbous_moon: "\u{1F316}",
      last_quarter_moon: "\u{1F317}",
      waning_crescent_moon: "\u{1F318}",
      crescent_moon: "\u{1F319}",
      new_moon_with_face: "\u{1F31A}",
      first_quarter_moon_with_face: "\u{1F31B}",
      last_quarter_moon_with_face: "\u{1F31C}",
      thermometer: "\u{1F321}\uFE0F",
      sunny: "\u2600\uFE0F",
      full_moon_with_face: "\u{1F31D}",
      sun_with_face: "\u{1F31E}",
      ringed_planet: "\u{1FA90}",
      star: "\u2B50",
      star2: "\u{1F31F}",
      stars: "\u{1F320}",
      milky_way: "\u{1F30C}",
      cloud: "\u2601\uFE0F",
      partly_sunny: "\u26C5",
      cloud_with_lightning_and_rain: "\u26C8\uFE0F",
      sun_behind_small_cloud: "\u{1F324}\uFE0F",
      sun_behind_large_cloud: "\u{1F325}\uFE0F",
      sun_behind_rain_cloud: "\u{1F326}\uFE0F",
      cloud_with_rain: "\u{1F327}\uFE0F",
      cloud_with_snow: "\u{1F328}\uFE0F",
      cloud_with_lightning: "\u{1F329}\uFE0F",
      tornado: "\u{1F32A}\uFE0F",
      fog: "\u{1F32B}\uFE0F",
      wind_face: "\u{1F32C}\uFE0F",
      cyclone: "\u{1F300}",
      rainbow: "\u{1F308}",
      closed_umbrella: "\u{1F302}",
      open_umbrella: "\u2602\uFE0F",
      umbrella: "\u2614",
      parasol_on_ground: "\u26F1\uFE0F",
      zap: "\u26A1",
      snowflake: "\u2744\uFE0F",
      snowman_with_snow: "\u2603\uFE0F",
      snowman: "\u26C4",
      comet: "\u2604\uFE0F",
      fire: "\u{1F525}",
      droplet: "\u{1F4A7}",
      ocean: "\u{1F30A}",
      jack_o_lantern: "\u{1F383}",
      christmas_tree: "\u{1F384}",
      fireworks: "\u{1F386}",
      sparkler: "\u{1F387}",
      firecracker: "\u{1F9E8}",
      sparkles: "\u2728",
      balloon: "\u{1F388}",
      tada: "\u{1F389}",
      confetti_ball: "\u{1F38A}",
      tanabata_tree: "\u{1F38B}",
      bamboo: "\u{1F38D}",
      dolls: "\u{1F38E}",
      flags: "\u{1F38F}",
      wind_chime: "\u{1F390}",
      rice_scene: "\u{1F391}",
      red_envelope: "\u{1F9E7}",
      ribbon: "\u{1F380}",
      gift: "\u{1F381}",
      reminder_ribbon: "\u{1F397}\uFE0F",
      tickets: "\u{1F39F}\uFE0F",
      ticket: "\u{1F3AB}",
      medal_military: "\u{1F396}\uFE0F",
      trophy: "\u{1F3C6}",
      medal_sports: "\u{1F3C5}",
      "1st_place_medal": "\u{1F947}",
      "2nd_place_medal": "\u{1F948}",
      "3rd_place_medal": "\u{1F949}",
      soccer: "\u26BD",
      baseball: "\u26BE",
      softball: "\u{1F94E}",
      basketball: "\u{1F3C0}",
      volleyball: "\u{1F3D0}",
      football: "\u{1F3C8}",
      rugby_football: "\u{1F3C9}",
      tennis: "\u{1F3BE}",
      flying_disc: "\u{1F94F}",
      bowling: "\u{1F3B3}",
      cricket_game: "\u{1F3CF}",
      field_hockey: "\u{1F3D1}",
      ice_hockey: "\u{1F3D2}",
      lacrosse: "\u{1F94D}",
      ping_pong: "\u{1F3D3}",
      badminton: "\u{1F3F8}",
      boxing_glove: "\u{1F94A}",
      martial_arts_uniform: "\u{1F94B}",
      goal_net: "\u{1F945}",
      golf: "\u26F3",
      ice_skate: "\u26F8\uFE0F",
      fishing_pole_and_fish: "\u{1F3A3}",
      diving_mask: "\u{1F93F}",
      running_shirt_with_sash: "\u{1F3BD}",
      ski: "\u{1F3BF}",
      sled: "\u{1F6F7}",
      curling_stone: "\u{1F94C}",
      dart: "\u{1F3AF}",
      yo_yo: "\u{1FA80}",
      kite: "\u{1FA81}",
      "8ball": "\u{1F3B1}",
      crystal_ball: "\u{1F52E}",
      magic_wand: "\u{1FA84}",
      nazar_amulet: "\u{1F9FF}",
      video_game: "\u{1F3AE}",
      joystick: "\u{1F579}\uFE0F",
      slot_machine: "\u{1F3B0}",
      game_die: "\u{1F3B2}",
      jigsaw: "\u{1F9E9}",
      teddy_bear: "\u{1F9F8}",
      pinata: "\u{1FA85}",
      nesting_dolls: "\u{1FA86}",
      spades: "\u2660\uFE0F",
      hearts: "\u2665\uFE0F",
      diamonds: "\u2666\uFE0F",
      clubs: "\u2663\uFE0F",
      chess_pawn: "\u265F\uFE0F",
      black_joker: "\u{1F0CF}",
      mahjong: "\u{1F004}",
      flower_playing_cards: "\u{1F3B4}",
      performing_arts: "\u{1F3AD}",
      framed_picture: "\u{1F5BC}\uFE0F",
      art: "\u{1F3A8}",
      thread: "\u{1F9F5}",
      sewing_needle: "\u{1FAA1}",
      yarn: "\u{1F9F6}",
      knot: "\u{1FAA2}",
      eyeglasses: "\u{1F453}",
      dark_sunglasses: "\u{1F576}\uFE0F",
      goggles: "\u{1F97D}",
      lab_coat: "\u{1F97C}",
      safety_vest: "\u{1F9BA}",
      necktie: "\u{1F454}",
      shirt: "\u{1F455}",
      tshirt: "\u{1F455}",
      jeans: "\u{1F456}",
      scarf: "\u{1F9E3}",
      gloves: "\u{1F9E4}",
      coat: "\u{1F9E5}",
      socks: "\u{1F9E6}",
      dress: "\u{1F457}",
      kimono: "\u{1F458}",
      sari: "\u{1F97B}",
      one_piece_swimsuit: "\u{1FA71}",
      swim_brief: "\u{1FA72}",
      shorts: "\u{1FA73}",
      bikini: "\u{1F459}",
      womans_clothes: "\u{1F45A}",
      purse: "\u{1F45B}",
      handbag: "\u{1F45C}",
      pouch: "\u{1F45D}",
      shopping: "\u{1F6CD}\uFE0F",
      school_satchel: "\u{1F392}",
      thong_sandal: "\u{1FA74}",
      mans_shoe: "\u{1F45E}",
      shoe: "\u{1F45E}",
      athletic_shoe: "\u{1F45F}",
      hiking_boot: "\u{1F97E}",
      flat_shoe: "\u{1F97F}",
      high_heel: "\u{1F460}",
      sandal: "\u{1F461}",
      ballet_shoes: "\u{1FA70}",
      boot: "\u{1F462}",
      crown: "\u{1F451}",
      womans_hat: "\u{1F452}",
      tophat: "\u{1F3A9}",
      mortar_board: "\u{1F393}",
      billed_cap: "\u{1F9E2}",
      military_helmet: "\u{1FA96}",
      rescue_worker_helmet: "\u26D1\uFE0F",
      prayer_beads: "\u{1F4FF}",
      lipstick: "\u{1F484}",
      ring: "\u{1F48D}",
      gem: "\u{1F48E}",
      mute: "\u{1F507}",
      speaker: "\u{1F508}",
      sound: "\u{1F509}",
      loud_sound: "\u{1F50A}",
      loudspeaker: "\u{1F4E2}",
      mega: "\u{1F4E3}",
      postal_horn: "\u{1F4EF}",
      bell: "\u{1F514}",
      no_bell: "\u{1F515}",
      musical_score: "\u{1F3BC}",
      musical_note: "\u{1F3B5}",
      notes: "\u{1F3B6}",
      studio_microphone: "\u{1F399}\uFE0F",
      level_slider: "\u{1F39A}\uFE0F",
      control_knobs: "\u{1F39B}\uFE0F",
      microphone: "\u{1F3A4}",
      headphones: "\u{1F3A7}",
      radio: "\u{1F4FB}",
      saxophone: "\u{1F3B7}",
      accordion: "\u{1FA97}",
      guitar: "\u{1F3B8}",
      musical_keyboard: "\u{1F3B9}",
      trumpet: "\u{1F3BA}",
      violin: "\u{1F3BB}",
      banjo: "\u{1FA95}",
      drum: "\u{1F941}",
      long_drum: "\u{1FA98}",
      iphone: "\u{1F4F1}",
      calling: "\u{1F4F2}",
      phone: "\u260E\uFE0F",
      telephone: "\u260E\uFE0F",
      telephone_receiver: "\u{1F4DE}",
      pager: "\u{1F4DF}",
      fax: "\u{1F4E0}",
      battery: "\u{1F50B}",
      electric_plug: "\u{1F50C}",
      computer: "\u{1F4BB}",
      desktop_computer: "\u{1F5A5}\uFE0F",
      printer: "\u{1F5A8}\uFE0F",
      keyboard: "\u2328\uFE0F",
      computer_mouse: "\u{1F5B1}\uFE0F",
      trackball: "\u{1F5B2}\uFE0F",
      minidisc: "\u{1F4BD}",
      floppy_disk: "\u{1F4BE}",
      cd: "\u{1F4BF}",
      dvd: "\u{1F4C0}",
      abacus: "\u{1F9EE}",
      movie_camera: "\u{1F3A5}",
      film_strip: "\u{1F39E}\uFE0F",
      film_projector: "\u{1F4FD}\uFE0F",
      clapper: "\u{1F3AC}",
      tv: "\u{1F4FA}",
      camera: "\u{1F4F7}",
      camera_flash: "\u{1F4F8}",
      video_camera: "\u{1F4F9}",
      vhs: "\u{1F4FC}",
      mag: "\u{1F50D}",
      mag_right: "\u{1F50E}",
      candle: "\u{1F56F}\uFE0F",
      bulb: "\u{1F4A1}",
      flashlight: "\u{1F526}",
      izakaya_lantern: "\u{1F3EE}",
      lantern: "\u{1F3EE}",
      diya_lamp: "\u{1FA94}",
      notebook_with_decorative_cover: "\u{1F4D4}",
      closed_book: "\u{1F4D5}",
      book: "\u{1F4D6}",
      open_book: "\u{1F4D6}",
      green_book: "\u{1F4D7}",
      blue_book: "\u{1F4D8}",
      orange_book: "\u{1F4D9}",
      books: "\u{1F4DA}",
      notebook: "\u{1F4D3}",
      ledger: "\u{1F4D2}",
      page_with_curl: "\u{1F4C3}",
      scroll: "\u{1F4DC}",
      page_facing_up: "\u{1F4C4}",
      newspaper: "\u{1F4F0}",
      newspaper_roll: "\u{1F5DE}\uFE0F",
      bookmark_tabs: "\u{1F4D1}",
      bookmark: "\u{1F516}",
      label: "\u{1F3F7}\uFE0F",
      moneybag: "\u{1F4B0}",
      coin: "\u{1FA99}",
      yen: "\u{1F4B4}",
      dollar: "\u{1F4B5}",
      euro: "\u{1F4B6}",
      pound: "\u{1F4B7}",
      money_with_wings: "\u{1F4B8}",
      credit_card: "\u{1F4B3}",
      receipt: "\u{1F9FE}",
      chart: "\u{1F4B9}",
      envelope: "\u2709\uFE0F",
      email: "\u{1F4E7}",
      "e-mail": "\u{1F4E7}",
      incoming_envelope: "\u{1F4E8}",
      envelope_with_arrow: "\u{1F4E9}",
      outbox_tray: "\u{1F4E4}",
      inbox_tray: "\u{1F4E5}",
      package: "\u{1F4E6}",
      mailbox: "\u{1F4EB}",
      mailbox_closed: "\u{1F4EA}",
      mailbox_with_mail: "\u{1F4EC}",
      mailbox_with_no_mail: "\u{1F4ED}",
      postbox: "\u{1F4EE}",
      ballot_box: "\u{1F5F3}\uFE0F",
      pencil2: "\u270F\uFE0F",
      black_nib: "\u2712\uFE0F",
      fountain_pen: "\u{1F58B}\uFE0F",
      pen: "\u{1F58A}\uFE0F",
      paintbrush: "\u{1F58C}\uFE0F",
      crayon: "\u{1F58D}\uFE0F",
      memo: "\u{1F4DD}",
      pencil: "\u{1F4DD}",
      briefcase: "\u{1F4BC}",
      file_folder: "\u{1F4C1}",
      open_file_folder: "\u{1F4C2}",
      card_index_dividers: "\u{1F5C2}\uFE0F",
      date: "\u{1F4C5}",
      calendar: "\u{1F4C6}",
      spiral_notepad: "\u{1F5D2}\uFE0F",
      spiral_calendar: "\u{1F5D3}\uFE0F",
      card_index: "\u{1F4C7}",
      chart_with_upwards_trend: "\u{1F4C8}",
      chart_with_downwards_trend: "\u{1F4C9}",
      bar_chart: "\u{1F4CA}",
      clipboard: "\u{1F4CB}",
      pushpin: "\u{1F4CC}",
      round_pushpin: "\u{1F4CD}",
      paperclip: "\u{1F4CE}",
      paperclips: "\u{1F587}\uFE0F",
      straight_ruler: "\u{1F4CF}",
      triangular_ruler: "\u{1F4D0}",
      scissors: "\u2702\uFE0F",
      card_file_box: "\u{1F5C3}\uFE0F",
      file_cabinet: "\u{1F5C4}\uFE0F",
      wastebasket: "\u{1F5D1}\uFE0F",
      lock: "\u{1F512}",
      unlock: "\u{1F513}",
      lock_with_ink_pen: "\u{1F50F}",
      closed_lock_with_key: "\u{1F510}",
      key: "\u{1F511}",
      old_key: "\u{1F5DD}\uFE0F",
      hammer: "\u{1F528}",
      axe: "\u{1FA93}",
      pick: "\u26CF\uFE0F",
      hammer_and_pick: "\u2692\uFE0F",
      hammer_and_wrench: "\u{1F6E0}\uFE0F",
      dagger: "\u{1F5E1}\uFE0F",
      crossed_swords: "\u2694\uFE0F",
      gun: "\u{1F52B}",
      boomerang: "\u{1FA83}",
      bow_and_arrow: "\u{1F3F9}",
      shield: "\u{1F6E1}\uFE0F",
      carpentry_saw: "\u{1FA9A}",
      wrench: "\u{1F527}",
      screwdriver: "\u{1FA9B}",
      nut_and_bolt: "\u{1F529}",
      gear: "\u2699\uFE0F",
      clamp: "\u{1F5DC}\uFE0F",
      balance_scale: "\u2696\uFE0F",
      probing_cane: "\u{1F9AF}",
      link: "\u{1F517}",
      chains: "\u26D3\uFE0F",
      hook: "\u{1FA9D}",
      toolbox: "\u{1F9F0}",
      magnet: "\u{1F9F2}",
      ladder: "\u{1FA9C}",
      alembic: "\u2697\uFE0F",
      test_tube: "\u{1F9EA}",
      petri_dish: "\u{1F9EB}",
      dna: "\u{1F9EC}",
      microscope: "\u{1F52C}",
      telescope: "\u{1F52D}",
      satellite: "\u{1F4E1}",
      syringe: "\u{1F489}",
      drop_of_blood: "\u{1FA78}",
      pill: "\u{1F48A}",
      adhesive_bandage: "\u{1FA79}",
      stethoscope: "\u{1FA7A}",
      door: "\u{1F6AA}",
      elevator: "\u{1F6D7}",
      mirror: "\u{1FA9E}",
      window: "\u{1FA9F}",
      bed: "\u{1F6CF}\uFE0F",
      couch_and_lamp: "\u{1F6CB}\uFE0F",
      chair: "\u{1FA91}",
      toilet: "\u{1F6BD}",
      plunger: "\u{1FAA0}",
      shower: "\u{1F6BF}",
      bathtub: "\u{1F6C1}",
      mouse_trap: "\u{1FAA4}",
      razor: "\u{1FA92}",
      lotion_bottle: "\u{1F9F4}",
      safety_pin: "\u{1F9F7}",
      broom: "\u{1F9F9}",
      basket: "\u{1F9FA}",
      roll_of_paper: "\u{1F9FB}",
      bucket: "\u{1FAA3}",
      soap: "\u{1F9FC}",
      toothbrush: "\u{1FAA5}",
      sponge: "\u{1F9FD}",
      fire_extinguisher: "\u{1F9EF}",
      shopping_cart: "\u{1F6D2}",
      smoking: "\u{1F6AC}",
      coffin: "\u26B0\uFE0F",
      headstone: "\u{1FAA6}",
      funeral_urn: "\u26B1\uFE0F",
      moyai: "\u{1F5FF}",
      placard: "\u{1FAA7}",
      atm: "\u{1F3E7}",
      put_litter_in_its_place: "\u{1F6AE}",
      potable_water: "\u{1F6B0}",
      wheelchair: "\u267F",
      mens: "\u{1F6B9}",
      womens: "\u{1F6BA}",
      restroom: "\u{1F6BB}",
      baby_symbol: "\u{1F6BC}",
      wc: "\u{1F6BE}",
      passport_control: "\u{1F6C2}",
      customs: "\u{1F6C3}",
      baggage_claim: "\u{1F6C4}",
      left_luggage: "\u{1F6C5}",
      warning: "\u26A0\uFE0F",
      children_crossing: "\u{1F6B8}",
      no_entry: "\u26D4",
      no_entry_sign: "\u{1F6AB}",
      no_bicycles: "\u{1F6B3}",
      no_smoking: "\u{1F6AD}",
      do_not_litter: "\u{1F6AF}",
      "non-potable_water": "\u{1F6B1}",
      no_pedestrians: "\u{1F6B7}",
      no_mobile_phones: "\u{1F4F5}",
      underage: "\u{1F51E}",
      radioactive: "\u2622\uFE0F",
      biohazard: "\u2623\uFE0F",
      arrow_up: "\u2B06\uFE0F",
      arrow_upper_right: "\u2197\uFE0F",
      arrow_right: "\u27A1\uFE0F",
      arrow_lower_right: "\u2198\uFE0F",
      arrow_down: "\u2B07\uFE0F",
      arrow_lower_left: "\u2199\uFE0F",
      arrow_left: "\u2B05\uFE0F",
      arrow_upper_left: "\u2196\uFE0F",
      arrow_up_down: "\u2195\uFE0F",
      left_right_arrow: "\u2194\uFE0F",
      leftwards_arrow_with_hook: "\u21A9\uFE0F",
      arrow_right_hook: "\u21AA\uFE0F",
      arrow_heading_up: "\u2934\uFE0F",
      arrow_heading_down: "\u2935\uFE0F",
      arrows_clockwise: "\u{1F503}",
      arrows_counterclockwise: "\u{1F504}",
      back: "\u{1F519}",
      end: "\u{1F51A}",
      on: "\u{1F51B}",
      soon: "\u{1F51C}",
      top: "\u{1F51D}",
      place_of_worship: "\u{1F6D0}",
      atom_symbol: "\u269B\uFE0F",
      om: "\u{1F549}\uFE0F",
      star_of_david: "\u2721\uFE0F",
      wheel_of_dharma: "\u2638\uFE0F",
      yin_yang: "\u262F\uFE0F",
      latin_cross: "\u271D\uFE0F",
      orthodox_cross: "\u2626\uFE0F",
      star_and_crescent: "\u262A\uFE0F",
      peace_symbol: "\u262E\uFE0F",
      menorah: "\u{1F54E}",
      six_pointed_star: "\u{1F52F}",
      aries: "\u2648",
      taurus: "\u2649",
      gemini: "\u264A",
      cancer: "\u264B",
      leo: "\u264C",
      virgo: "\u264D",
      libra: "\u264E",
      scorpius: "\u264F",
      sagittarius: "\u2650",
      capricorn: "\u2651",
      aquarius: "\u2652",
      pisces: "\u2653",
      ophiuchus: "\u26CE",
      twisted_rightwards_arrows: "\u{1F500}",
      repeat: "\u{1F501}",
      repeat_one: "\u{1F502}",
      arrow_forward: "\u25B6\uFE0F",
      fast_forward: "\u23E9",
      next_track_button: "\u23ED\uFE0F",
      play_or_pause_button: "\u23EF\uFE0F",
      arrow_backward: "\u25C0\uFE0F",
      rewind: "\u23EA",
      previous_track_button: "\u23EE\uFE0F",
      arrow_up_small: "\u{1F53C}",
      arrow_double_up: "\u23EB",
      arrow_down_small: "\u{1F53D}",
      arrow_double_down: "\u23EC",
      pause_button: "\u23F8\uFE0F",
      stop_button: "\u23F9\uFE0F",
      record_button: "\u23FA\uFE0F",
      eject_button: "\u23CF\uFE0F",
      cinema: "\u{1F3A6}",
      low_brightness: "\u{1F505}",
      high_brightness: "\u{1F506}",
      signal_strength: "\u{1F4F6}",
      vibration_mode: "\u{1F4F3}",
      mobile_phone_off: "\u{1F4F4}",
      female_sign: "\u2640\uFE0F",
      male_sign: "\u2642\uFE0F",
      transgender_symbol: "\u26A7\uFE0F",
      heavy_multiplication_x: "\u2716\uFE0F",
      heavy_plus_sign: "\u2795",
      heavy_minus_sign: "\u2796",
      heavy_division_sign: "\u2797",
      infinity: "\u267E\uFE0F",
      bangbang: "\u203C\uFE0F",
      interrobang: "\u2049\uFE0F",
      question: "\u2753",
      grey_question: "\u2754",
      grey_exclamation: "\u2755",
      exclamation: "\u2757",
      heavy_exclamation_mark: "\u2757",
      wavy_dash: "\u3030\uFE0F",
      currency_exchange: "\u{1F4B1}",
      heavy_dollar_sign: "\u{1F4B2}",
      medical_symbol: "\u2695\uFE0F",
      recycle: "\u267B\uFE0F",
      fleur_de_lis: "\u269C\uFE0F",
      trident: "\u{1F531}",
      name_badge: "\u{1F4DB}",
      beginner: "\u{1F530}",
      o: "\u2B55",
      white_check_mark: "\u2705",
      ballot_box_with_check: "\u2611\uFE0F",
      heavy_check_mark: "\u2714\uFE0F",
      x: "\u274C",
      negative_squared_cross_mark: "\u274E",
      curly_loop: "\u27B0",
      loop: "\u27BF",
      part_alternation_mark: "\u303D\uFE0F",
      eight_spoked_asterisk: "\u2733\uFE0F",
      eight_pointed_black_star: "\u2734\uFE0F",
      sparkle: "\u2747\uFE0F",
      copyright: "\xA9\uFE0F",
      registered: "\xAE\uFE0F",
      tm: "\u2122\uFE0F",
      hash: "#\uFE0F\u20E3",
      asterisk: "*\uFE0F\u20E3",
      zero: "0\uFE0F\u20E3",
      one: "1\uFE0F\u20E3",
      two: "2\uFE0F\u20E3",
      three: "3\uFE0F\u20E3",
      four: "4\uFE0F\u20E3",
      five: "5\uFE0F\u20E3",
      six: "6\uFE0F\u20E3",
      seven: "7\uFE0F\u20E3",
      eight: "8\uFE0F\u20E3",
      nine: "9\uFE0F\u20E3",
      keycap_ten: "\u{1F51F}",
      capital_abcd: "\u{1F520}",
      abcd: "\u{1F521}",
      symbols: "\u{1F523}",
      abc: "\u{1F524}",
      a: "\u{1F170}\uFE0F",
      ab: "\u{1F18E}",
      b: "\u{1F171}\uFE0F",
      cl: "\u{1F191}",
      cool: "\u{1F192}",
      free: "\u{1F193}",
      information_source: "\u2139\uFE0F",
      id: "\u{1F194}",
      m: "\u24C2\uFE0F",
      new: "\u{1F195}",
      ng: "\u{1F196}",
      o2: "\u{1F17E}\uFE0F",
      ok: "\u{1F197}",
      parking: "\u{1F17F}\uFE0F",
      sos: "\u{1F198}",
      up: "\u{1F199}",
      vs: "\u{1F19A}",
      koko: "\u{1F201}",
      sa: "\u{1F202}\uFE0F",
      ideograph_advantage: "\u{1F250}",
      accept: "\u{1F251}",
      congratulations: "\u3297\uFE0F",
      secret: "\u3299\uFE0F",
      u6e80: "\u{1F235}",
      red_circle: "\u{1F534}",
      orange_circle: "\u{1F7E0}",
      yellow_circle: "\u{1F7E1}",
      green_circle: "\u{1F7E2}",
      large_blue_circle: "\u{1F535}",
      purple_circle: "\u{1F7E3}",
      brown_circle: "\u{1F7E4}",
      black_circle: "\u26AB",
      white_circle: "\u26AA",
      red_square: "\u{1F7E5}",
      orange_square: "\u{1F7E7}",
      yellow_square: "\u{1F7E8}",
      green_square: "\u{1F7E9}",
      blue_square: "\u{1F7E6}",
      purple_square: "\u{1F7EA}",
      brown_square: "\u{1F7EB}",
      black_large_square: "\u2B1B",
      white_large_square: "\u2B1C",
      black_medium_square: "\u25FC\uFE0F",
      white_medium_square: "\u25FB\uFE0F",
      black_medium_small_square: "\u25FE",
      white_medium_small_square: "\u25FD",
      black_small_square: "\u25AA\uFE0F",
      white_small_square: "\u25AB\uFE0F",
      large_orange_diamond: "\u{1F536}",
      large_blue_diamond: "\u{1F537}",
      small_orange_diamond: "\u{1F538}",
      small_blue_diamond: "\u{1F539}",
      small_red_triangle: "\u{1F53A}",
      small_red_triangle_down: "\u{1F53B}",
      diamond_shape_with_a_dot_inside: "\u{1F4A0}",
      radio_button: "\u{1F518}",
      white_square_button: "\u{1F533}",
      black_square_button: "\u{1F532}",
      checkered_flag: "\u{1F3C1}",
      triangular_flag_on_post: "\u{1F6A9}",
      crossed_flags: "\u{1F38C}",
      black_flag: "\u{1F3F4}",
      white_flag: "\u{1F3F3}\uFE0F",
      rainbow_flag: "\u{1F3F3}\uFE0F\u200D\u{1F308}",
      transgender_flag: "\u{1F3F3}\uFE0F\u200D\u26A7\uFE0F",
      pirate_flag: "\u{1F3F4}\u200D\u2620\uFE0F",
      ascension_island: "\u{1F1E6}\u{1F1E8}",
      andorra: "\u{1F1E6}\u{1F1E9}",
      united_arab_emirates: "\u{1F1E6}\u{1F1EA}",
      afghanistan: "\u{1F1E6}\u{1F1EB}",
      antigua_barbuda: "\u{1F1E6}\u{1F1EC}",
      anguilla: "\u{1F1E6}\u{1F1EE}",
      albania: "\u{1F1E6}\u{1F1F1}",
      armenia: "\u{1F1E6}\u{1F1F2}",
      angola: "\u{1F1E6}\u{1F1F4}",
      antarctica: "\u{1F1E6}\u{1F1F6}",
      argentina: "\u{1F1E6}\u{1F1F7}",
      american_samoa: "\u{1F1E6}\u{1F1F8}",
      austria: "\u{1F1E6}\u{1F1F9}",
      australia: "\u{1F1E6}\u{1F1FA}",
      aruba: "\u{1F1E6}\u{1F1FC}",
      aland_islands: "\u{1F1E6}\u{1F1FD}",
      azerbaijan: "\u{1F1E6}\u{1F1FF}",
      bosnia_herzegovina: "\u{1F1E7}\u{1F1E6}",
      barbados: "\u{1F1E7}\u{1F1E7}",
      bangladesh: "\u{1F1E7}\u{1F1E9}",
      belgium: "\u{1F1E7}\u{1F1EA}",
      burkina_faso: "\u{1F1E7}\u{1F1EB}",
      bulgaria: "\u{1F1E7}\u{1F1EC}",
      bahrain: "\u{1F1E7}\u{1F1ED}",
      burundi: "\u{1F1E7}\u{1F1EE}",
      benin: "\u{1F1E7}\u{1F1EF}",
      st_barthelemy: "\u{1F1E7}\u{1F1F1}",
      bermuda: "\u{1F1E7}\u{1F1F2}",
      brunei: "\u{1F1E7}\u{1F1F3}",
      bolivia: "\u{1F1E7}\u{1F1F4}",
      caribbean_netherlands: "\u{1F1E7}\u{1F1F6}",
      brazil: "\u{1F1E7}\u{1F1F7}",
      bahamas: "\u{1F1E7}\u{1F1F8}",
      bhutan: "\u{1F1E7}\u{1F1F9}",
      bouvet_island: "\u{1F1E7}\u{1F1FB}",
      botswana: "\u{1F1E7}\u{1F1FC}",
      belarus: "\u{1F1E7}\u{1F1FE}",
      belize: "\u{1F1E7}\u{1F1FF}",
      canada: "\u{1F1E8}\u{1F1E6}",
      cocos_islands: "\u{1F1E8}\u{1F1E8}",
      congo_kinshasa: "\u{1F1E8}\u{1F1E9}",
      central_african_republic: "\u{1F1E8}\u{1F1EB}",
      congo_brazzaville: "\u{1F1E8}\u{1F1EC}",
      switzerland: "\u{1F1E8}\u{1F1ED}",
      cote_divoire: "\u{1F1E8}\u{1F1EE}",
      cook_islands: "\u{1F1E8}\u{1F1F0}",
      chile: "\u{1F1E8}\u{1F1F1}",
      cameroon: "\u{1F1E8}\u{1F1F2}",
      cn: "\u{1F1E8}\u{1F1F3}",
      colombia: "\u{1F1E8}\u{1F1F4}",
      clipperton_island: "\u{1F1E8}\u{1F1F5}",
      costa_rica: "\u{1F1E8}\u{1F1F7}",
      cuba: "\u{1F1E8}\u{1F1FA}",
      cape_verde: "\u{1F1E8}\u{1F1FB}",
      curacao: "\u{1F1E8}\u{1F1FC}",
      christmas_island: "\u{1F1E8}\u{1F1FD}",
      cyprus: "\u{1F1E8}\u{1F1FE}",
      czech_republic: "\u{1F1E8}\u{1F1FF}",
      de: "\u{1F1E9}\u{1F1EA}",
      diego_garcia: "\u{1F1E9}\u{1F1EC}",
      djibouti: "\u{1F1E9}\u{1F1EF}",
      denmark: "\u{1F1E9}\u{1F1F0}",
      dominica: "\u{1F1E9}\u{1F1F2}",
      dominican_republic: "\u{1F1E9}\u{1F1F4}",
      algeria: "\u{1F1E9}\u{1F1FF}",
      ceuta_melilla: "\u{1F1EA}\u{1F1E6}",
      ecuador: "\u{1F1EA}\u{1F1E8}",
      estonia: "\u{1F1EA}\u{1F1EA}",
      egypt: "\u{1F1EA}\u{1F1EC}",
      western_sahara: "\u{1F1EA}\u{1F1ED}",
      eritrea: "\u{1F1EA}\u{1F1F7}",
      es: "\u{1F1EA}\u{1F1F8}",
      ethiopia: "\u{1F1EA}\u{1F1F9}",
      eu: "\u{1F1EA}\u{1F1FA}",
      european_union: "\u{1F1EA}\u{1F1FA}",
      finland: "\u{1F1EB}\u{1F1EE}",
      fiji: "\u{1F1EB}\u{1F1EF}",
      falkland_islands: "\u{1F1EB}\u{1F1F0}",
      micronesia: "\u{1F1EB}\u{1F1F2}",
      faroe_islands: "\u{1F1EB}\u{1F1F4}",
      fr: "\u{1F1EB}\u{1F1F7}",
      gabon: "\u{1F1EC}\u{1F1E6}",
      gb: "\u{1F1EC}\u{1F1E7}",
      uk: "\u{1F1EC}\u{1F1E7}",
      grenada: "\u{1F1EC}\u{1F1E9}",
      georgia: "\u{1F1EC}\u{1F1EA}",
      french_guiana: "\u{1F1EC}\u{1F1EB}",
      guernsey: "\u{1F1EC}\u{1F1EC}",
      ghana: "\u{1F1EC}\u{1F1ED}",
      gibraltar: "\u{1F1EC}\u{1F1EE}",
      greenland: "\u{1F1EC}\u{1F1F1}",
      gambia: "\u{1F1EC}\u{1F1F2}",
      guinea: "\u{1F1EC}\u{1F1F3}",
      guadeloupe: "\u{1F1EC}\u{1F1F5}",
      equatorial_guinea: "\u{1F1EC}\u{1F1F6}",
      greece: "\u{1F1EC}\u{1F1F7}",
      south_georgia_south_sandwich_islands: "\u{1F1EC}\u{1F1F8}",
      guatemala: "\u{1F1EC}\u{1F1F9}",
      guam: "\u{1F1EC}\u{1F1FA}",
      guinea_bissau: "\u{1F1EC}\u{1F1FC}",
      guyana: "\u{1F1EC}\u{1F1FE}",
      hong_kong: "\u{1F1ED}\u{1F1F0}",
      heard_mcdonald_islands: "\u{1F1ED}\u{1F1F2}",
      honduras: "\u{1F1ED}\u{1F1F3}",
      croatia: "\u{1F1ED}\u{1F1F7}",
      haiti: "\u{1F1ED}\u{1F1F9}",
      hungary: "\u{1F1ED}\u{1F1FA}",
      canary_islands: "\u{1F1EE}\u{1F1E8}",
      indonesia: "\u{1F1EE}\u{1F1E9}",
      ireland: "\u{1F1EE}\u{1F1EA}",
      israel: "\u{1F1EE}\u{1F1F1}",
      isle_of_man: "\u{1F1EE}\u{1F1F2}",
      india: "\u{1F1EE}\u{1F1F3}",
      british_indian_ocean_territory: "\u{1F1EE}\u{1F1F4}",
      iraq: "\u{1F1EE}\u{1F1F6}",
      iran: "\u{1F1EE}\u{1F1F7}",
      iceland: "\u{1F1EE}\u{1F1F8}",
      it: "\u{1F1EE}\u{1F1F9}",
      jersey: "\u{1F1EF}\u{1F1EA}",
      jamaica: "\u{1F1EF}\u{1F1F2}",
      jordan: "\u{1F1EF}\u{1F1F4}",
      jp: "\u{1F1EF}\u{1F1F5}",
      kenya: "\u{1F1F0}\u{1F1EA}",
      kyrgyzstan: "\u{1F1F0}\u{1F1EC}",
      cambodia: "\u{1F1F0}\u{1F1ED}",
      kiribati: "\u{1F1F0}\u{1F1EE}",
      comoros: "\u{1F1F0}\u{1F1F2}",
      st_kitts_nevis: "\u{1F1F0}\u{1F1F3}",
      north_korea: "\u{1F1F0}\u{1F1F5}",
      kr: "\u{1F1F0}\u{1F1F7}",
      kuwait: "\u{1F1F0}\u{1F1FC}",
      cayman_islands: "\u{1F1F0}\u{1F1FE}",
      kazakhstan: "\u{1F1F0}\u{1F1FF}",
      laos: "\u{1F1F1}\u{1F1E6}",
      lebanon: "\u{1F1F1}\u{1F1E7}",
      st_lucia: "\u{1F1F1}\u{1F1E8}",
      liechtenstein: "\u{1F1F1}\u{1F1EE}",
      sri_lanka: "\u{1F1F1}\u{1F1F0}",
      liberia: "\u{1F1F1}\u{1F1F7}",
      lesotho: "\u{1F1F1}\u{1F1F8}",
      lithuania: "\u{1F1F1}\u{1F1F9}",
      luxembourg: "\u{1F1F1}\u{1F1FA}",
      latvia: "\u{1F1F1}\u{1F1FB}",
      libya: "\u{1F1F1}\u{1F1FE}",
      morocco: "\u{1F1F2}\u{1F1E6}",
      monaco: "\u{1F1F2}\u{1F1E8}",
      moldova: "\u{1F1F2}\u{1F1E9}",
      montenegro: "\u{1F1F2}\u{1F1EA}",
      st_martin: "\u{1F1F2}\u{1F1EB}",
      madagascar: "\u{1F1F2}\u{1F1EC}",
      marshall_islands: "\u{1F1F2}\u{1F1ED}",
      macedonia: "\u{1F1F2}\u{1F1F0}",
      mali: "\u{1F1F2}\u{1F1F1}",
      myanmar: "\u{1F1F2}\u{1F1F2}",
      mongolia: "\u{1F1F2}\u{1F1F3}",
      macau: "\u{1F1F2}\u{1F1F4}",
      northern_mariana_islands: "\u{1F1F2}\u{1F1F5}",
      martinique: "\u{1F1F2}\u{1F1F6}",
      mauritania: "\u{1F1F2}\u{1F1F7}",
      montserrat: "\u{1F1F2}\u{1F1F8}",
      malta: "\u{1F1F2}\u{1F1F9}",
      mauritius: "\u{1F1F2}\u{1F1FA}",
      maldives: "\u{1F1F2}\u{1F1FB}",
      malawi: "\u{1F1F2}\u{1F1FC}",
      mexico: "\u{1F1F2}\u{1F1FD}",
      malaysia: "\u{1F1F2}\u{1F1FE}",
      mozambique: "\u{1F1F2}\u{1F1FF}",
      namibia: "\u{1F1F3}\u{1F1E6}",
      new_caledonia: "\u{1F1F3}\u{1F1E8}",
      niger: "\u{1F1F3}\u{1F1EA}",
      norfolk_island: "\u{1F1F3}\u{1F1EB}",
      nigeria: "\u{1F1F3}\u{1F1EC}",
      nicaragua: "\u{1F1F3}\u{1F1EE}",
      netherlands: "\u{1F1F3}\u{1F1F1}",
      norway: "\u{1F1F3}\u{1F1F4}",
      nepal: "\u{1F1F3}\u{1F1F5}",
      nauru: "\u{1F1F3}\u{1F1F7}",
      niue: "\u{1F1F3}\u{1F1FA}",
      new_zealand: "\u{1F1F3}\u{1F1FF}",
      oman: "\u{1F1F4}\u{1F1F2}",
      panama: "\u{1F1F5}\u{1F1E6}",
      peru: "\u{1F1F5}\u{1F1EA}",
      french_polynesia: "\u{1F1F5}\u{1F1EB}",
      papua_new_guinea: "\u{1F1F5}\u{1F1EC}",
      philippines: "\u{1F1F5}\u{1F1ED}",
      pakistan: "\u{1F1F5}\u{1F1F0}",
      poland: "\u{1F1F5}\u{1F1F1}",
      st_pierre_miquelon: "\u{1F1F5}\u{1F1F2}",
      pitcairn_islands: "\u{1F1F5}\u{1F1F3}",
      puerto_rico: "\u{1F1F5}\u{1F1F7}",
      palestinian_territories: "\u{1F1F5}\u{1F1F8}",
      portugal: "\u{1F1F5}\u{1F1F9}",
      palau: "\u{1F1F5}\u{1F1FC}",
      paraguay: "\u{1F1F5}\u{1F1FE}",
      qatar: "\u{1F1F6}\u{1F1E6}",
      reunion: "\u{1F1F7}\u{1F1EA}",
      romania: "\u{1F1F7}\u{1F1F4}",
      serbia: "\u{1F1F7}\u{1F1F8}",
      ru: "\u{1F1F7}\u{1F1FA}",
      rwanda: "\u{1F1F7}\u{1F1FC}",
      saudi_arabia: "\u{1F1F8}\u{1F1E6}",
      solomon_islands: "\u{1F1F8}\u{1F1E7}",
      seychelles: "\u{1F1F8}\u{1F1E8}",
      sudan: "\u{1F1F8}\u{1F1E9}",
      sweden: "\u{1F1F8}\u{1F1EA}",
      singapore: "\u{1F1F8}\u{1F1EC}",
      st_helena: "\u{1F1F8}\u{1F1ED}",
      slovenia: "\u{1F1F8}\u{1F1EE}",
      svalbard_jan_mayen: "\u{1F1F8}\u{1F1EF}",
      slovakia: "\u{1F1F8}\u{1F1F0}",
      sierra_leone: "\u{1F1F8}\u{1F1F1}",
      san_marino: "\u{1F1F8}\u{1F1F2}",
      senegal: "\u{1F1F8}\u{1F1F3}",
      somalia: "\u{1F1F8}\u{1F1F4}",
      suriname: "\u{1F1F8}\u{1F1F7}",
      south_sudan: "\u{1F1F8}\u{1F1F8}",
      sao_tome_principe: "\u{1F1F8}\u{1F1F9}",
      el_salvador: "\u{1F1F8}\u{1F1FB}",
      sint_maarten: "\u{1F1F8}\u{1F1FD}",
      syria: "\u{1F1F8}\u{1F1FE}",
      swaziland: "\u{1F1F8}\u{1F1FF}",
      tristan_da_cunha: "\u{1F1F9}\u{1F1E6}",
      turks_caicos_islands: "\u{1F1F9}\u{1F1E8}",
      chad: "\u{1F1F9}\u{1F1E9}",
      french_southern_territories: "\u{1F1F9}\u{1F1EB}",
      togo: "\u{1F1F9}\u{1F1EC}",
      thailand: "\u{1F1F9}\u{1F1ED}",
      tajikistan: "\u{1F1F9}\u{1F1EF}",
      tokelau: "\u{1F1F9}\u{1F1F0}",
      timor_leste: "\u{1F1F9}\u{1F1F1}",
      turkmenistan: "\u{1F1F9}\u{1F1F2}",
      tunisia: "\u{1F1F9}\u{1F1F3}",
      tonga: "\u{1F1F9}\u{1F1F4}",
      tr: "\u{1F1F9}\u{1F1F7}",
      trinidad_tobago: "\u{1F1F9}\u{1F1F9}",
      tuvalu: "\u{1F1F9}\u{1F1FB}",
      taiwan: "\u{1F1F9}\u{1F1FC}",
      tanzania: "\u{1F1F9}\u{1F1FF}",
      ukraine: "\u{1F1FA}\u{1F1E6}",
      uganda: "\u{1F1FA}\u{1F1EC}",
      us_outlying_islands: "\u{1F1FA}\u{1F1F2}",
      united_nations: "\u{1F1FA}\u{1F1F3}",
      us: "\u{1F1FA}\u{1F1F8}",
      uruguay: "\u{1F1FA}\u{1F1FE}",
      uzbekistan: "\u{1F1FA}\u{1F1FF}",
      vatican_city: "\u{1F1FB}\u{1F1E6}",
      st_vincent_grenadines: "\u{1F1FB}\u{1F1E8}",
      venezuela: "\u{1F1FB}\u{1F1EA}",
      british_virgin_islands: "\u{1F1FB}\u{1F1EC}",
      us_virgin_islands: "\u{1F1FB}\u{1F1EE}",
      vietnam: "\u{1F1FB}\u{1F1F3}",
      vanuatu: "\u{1F1FB}\u{1F1FA}",
      wallis_futuna: "\u{1F1FC}\u{1F1EB}",
      samoa: "\u{1F1FC}\u{1F1F8}",
      kosovo: "\u{1F1FD}\u{1F1F0}",
      yemen: "\u{1F1FE}\u{1F1EA}",
      mayotte: "\u{1F1FE}\u{1F1F9}",
      south_africa: "\u{1F1FF}\u{1F1E6}",
      zambia: "\u{1F1FF}\u{1F1F2}",
      zimbabwe: "\u{1F1FF}\u{1F1FC}",
      england: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
      scotland: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
      wales: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/data/shortcuts.js
var require_shortcuts = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/data/shortcuts.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      angry: [">:(", ">:-("],
      blush: [':")', ':-")'],
      broken_heart: ["</3", "<\\3"],
      confused: [":/", ":-/"],
      cry: [":'(", ":'-(", ":,(", ":,-("],
      frowning: [":(", ":-("],
      heart: ["<3"],
      imp: ["]:(", "]:-("],
      innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
      joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
      kissing: [":*", ":-*"],
      laughing: ["x-)", "X-)"],
      neutral_face: [":|", ":-|"],
      open_mouth: [":o", ":-o", ":O", ":-O"],
      rage: [":@", ":-@"],
      smile: [":D", ":-D"],
      smiley: [":)", ":-)"],
      smiling_imp: ["]:)", "]:-)"],
      sob: [":,'(", ":,'-(", ";(", ";-("],
      stuck_out_tongue: [":P", ":-P"],
      sunglasses: ["8-)", "B-)"],
      sweat: [",:(", ",:-("],
      sweat_smile: [",:)", ",:-)"],
      unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
      wink: [";)", ";-)"]
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/render.js
var require_render = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/render.js"(exports2, module2) {
    "use strict";
    module2.exports = function emoji_html(tokens, idx) {
      return tokens[idx].content;
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/replace.js
var require_replace = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/replace.js"(exports2, module2) {
    "use strict";
    module2.exports = function create_rule(md, emojies, shortcuts, scanRE, replaceRE) {
      var arrayReplaceAt = md.utils.arrayReplaceAt, ucm = md.utils.lib.ucmicro, ZPCc = new RegExp([ucm.Z.source, ucm.P.source, ucm.Cc.source].join("|"));
      function splitTextToken(text, level, Token) {
        var token, last_pos = 0, nodes = [];
        text.replace(replaceRE, function(match, offset, src) {
          var emoji_name;
          if (shortcuts.hasOwnProperty(match)) {
            emoji_name = shortcuts[match];
            if (offset > 0 && !ZPCc.test(src[offset - 1])) {
              return;
            }
            if (offset + match.length < src.length && !ZPCc.test(src[offset + match.length])) {
              return;
            }
          } else {
            emoji_name = match.slice(1, -1);
          }
          if (offset > last_pos) {
            token = new Token("text", "", 0);
            token.content = text.slice(last_pos, offset);
            nodes.push(token);
          }
          token = new Token("emoji", "", 0);
          token.markup = emoji_name;
          token.content = emojies[emoji_name];
          nodes.push(token);
          last_pos = offset + match.length;
        });
        if (last_pos < text.length) {
          token = new Token("text", "", 0);
          token.content = text.slice(last_pos);
          nodes.push(token);
        }
        return nodes;
      }
      return function emoji_replace(state) {
        var i2, j, l2, tokens, token, blockTokens = state.tokens, autolinkLevel = 0;
        for (j = 0, l2 = blockTokens.length; j < l2; j++) {
          if (blockTokens[j].type !== "inline") {
            continue;
          }
          tokens = blockTokens[j].children;
          for (i2 = tokens.length - 1; i2 >= 0; i2--) {
            token = tokens[i2];
            if (token.type === "link_open" || token.type === "link_close") {
              if (token.info === "auto") {
                autolinkLevel -= token.nesting;
              }
            }
            if (token.type === "text" && autolinkLevel === 0 && scanRE.test(token.content)) {
              blockTokens[j].children = tokens = arrayReplaceAt(
                tokens,
                i2,
                splitTextToken(token.content, token.level, state.Token)
              );
            }
          }
        }
      };
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/normalize_opts.js
var require_normalize_opts = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/lib/normalize_opts.js"(exports2, module2) {
    "use strict";
    function quoteRE(str2) {
      return str2.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    module2.exports = function normalize_opts(options2) {
      var emojies = options2.defs, shortcuts;
      if (options2.enabled.length) {
        emojies = Object.keys(emojies).reduce(function(acc, key) {
          if (options2.enabled.indexOf(key) >= 0) {
            acc[key] = emojies[key];
          }
          return acc;
        }, {});
      }
      shortcuts = Object.keys(options2.shortcuts).reduce(function(acc, key) {
        if (!emojies[key]) {
          return acc;
        }
        if (Array.isArray(options2.shortcuts[key])) {
          options2.shortcuts[key].forEach(function(alias) {
            acc[alias] = key;
          });
          return acc;
        }
        acc[options2.shortcuts[key]] = key;
        return acc;
      }, {});
      var keys = Object.keys(emojies), names;
      if (keys.length === 0) {
        names = "^$";
      } else {
        names = keys.map(function(name) {
          return ":" + name + ":";
        }).concat(Object.keys(shortcuts)).sort().reverse().map(function(name) {
          return quoteRE(name);
        }).join("|");
      }
      var scanRE = RegExp(names);
      var replaceRE = RegExp(names, "g");
      return {
        defs: emojies,
        shortcuts,
        scanRE,
        replaceRE
      };
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/bare.js
var require_bare = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/bare.js"(exports2, module2) {
    "use strict";
    var emoji_html = require_render();
    var emoji_replace = require_replace();
    var normalize_opts = require_normalize_opts();
    module2.exports = function emoji_plugin(md, options2) {
      var defaults = {
        defs: {},
        shortcuts: {},
        enabled: []
      };
      var opts = normalize_opts(md.utils.assign({}, defaults, options2 || {}));
      md.renderer.rules.emoji = emoji_html;
      md.core.ruler.after(
        "linkify",
        "emoji",
        emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE)
      );
    };
  }
});

// node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/index.js
var require_markdown_it_emoji = __commonJS({
  "node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/index.js"(exports2, module2) {
    "use strict";
    var emojies_defs = require_full();
    var emojies_shortcuts = require_shortcuts();
    var bare_emoji_plugin = require_bare();
    module2.exports = function emoji_plugin(md, options2) {
      var defaults = {
        defs: emojies_defs,
        shortcuts: emojies_shortcuts,
        enabled: []
      };
      var opts = md.utils.assign({}, defaults, options2 || {});
      bare_emoji_plugin(md, opts);
    };
  }
});

// browser-external:module
var require_module = __commonJS({
  "browser-external:module"(exports2, module2) {
    module2.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          throw new Error(`Module "module" has been externalized for browser compatibility. Cannot access "module.${key}" in client code.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    blackBright: [90, 39],
    gray: [90, 39],
    grey: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/vendor/supports-color/browser.js
var isBlinkBasedBrowser = navigator.userAgentData ? navigator.userAgentData.brands.some(({ brand }) => brand === "Chromium") : /\b(Chrome|Chromium)\//.test(navigator.userAgent);
var colorSupport = isBlinkBasedBrowser ? {
  level: 1,
  hasBasic: true,
  has256: false,
  has16m: false
} : false;
var supportsColor = {
  stdout: colorSupport,
  stderr: colorSupport
};
var browser_default = supportsColor;

// node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = browser_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options2 = {}) => {
  if (options2.level && !(Number.isInteger(options2.level) && options2.level >= 0 && options2.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options2.level === void 0 ? colorLevel : options2.level;
};
var chalkFactory = (options2) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options2);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options2) {
  return chalkFactory(options2);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// node_modules/.pnpm/@vuepress+utils@2.0.0-beta.51/node_modules/@vuepress/utils/dist/index.js
var import_debug = __toESM(require_browser());
var import_fs_extra = __toESM(require_lib());

// node_modules/.pnpm/globby@13.1.2/node_modules/globby/index.js
var import_node_fs2 = __toESM(require_node_fs());
var import_node_path2 = __toESM(require_node_path());
var import_merge2 = __toESM(require_merge2());
var import_fast_glob2 = __toESM(require_out());
var import_dir_glob = __toESM(require_dir_glob());

// node_modules/.pnpm/globby@13.1.2/node_modules/globby/ignore.js
var import_node_process = __toESM(require_node_process(), 1);
var import_node_fs = __toESM(require_node_fs(), 1);
var import_node_path = __toESM(require_node_path(), 1);
var import_fast_glob = __toESM(require_out(), 1);
var import_ignore = __toESM(require_ignore(), 1);

// node_modules/.pnpm/slash@4.0.0/node_modules/slash/index.js
function slash(path4) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path4);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path4);
  if (isExtendedLengthPath || hasNonAscii) {
    return path4;
  }
  return path4.replace(/\\/g, "/");
}

// node_modules/.pnpm/globby@13.1.2/node_modules/globby/utilities.js
var import_node_url = __toESM(require_node_url(), 1);
var import_node_stream = __toESM(require_node_stream(), 1);
var toPath = (urlOrPath) => urlOrPath instanceof URL ? (0, import_node_url.fileURLToPath)(urlOrPath) : urlOrPath;
var FilterStream = class extends import_node_stream.Transform {
  constructor(filter) {
    super({
      objectMode: true,
      transform(data, encoding, callback) {
        callback(void 0, filter(data) ? data : void 0);
      }
    });
  }
};
var isNegativePattern = (pattern) => pattern[0] === "!";

// node_modules/.pnpm/globby@13.1.2/node_modules/globby/ignore.js
var ignoreFilesGlobOptions = {
  ignore: [
    "**/node_modules",
    "**/flow-typed",
    "**/coverage",
    "**/.git"
  ],
  absolute: true,
  dot: true
};
var GITIGNORE_FILES_PATTERN = "**/.gitignore";
var applyBaseToPattern = (pattern, base) => isNegativePattern(pattern) ? "!" + import_node_path.default.posix.join(base, pattern.slice(1)) : import_node_path.default.posix.join(base, pattern);
var parseIgnoreFile = (file, cwd) => {
  const base = slash(import_node_path.default.relative(cwd, import_node_path.default.dirname(file.filePath)));
  return file.content.split(/\r?\n/).filter((line) => line && !line.startsWith("#")).map((pattern) => applyBaseToPattern(pattern, base));
};
var toRelativePath = (fileOrDirectory, cwd) => {
  cwd = slash(cwd);
  if (import_node_path.default.isAbsolute(fileOrDirectory)) {
    if (slash(fileOrDirectory).startsWith(cwd)) {
      return import_node_path.default.relative(cwd, fileOrDirectory);
    }
    throw new Error(`Path ${fileOrDirectory} is not in cwd ${cwd}`);
  }
  return fileOrDirectory;
};
var getIsIgnoredPredicate = (files, cwd) => {
  const patterns = files.flatMap((file) => parseIgnoreFile(file, cwd));
  const ignores = (0, import_ignore.default)().add(patterns);
  return (fileOrDirectory) => {
    fileOrDirectory = toPath(fileOrDirectory);
    fileOrDirectory = toRelativePath(fileOrDirectory, cwd);
    return ignores.ignores(slash(fileOrDirectory));
  };
};
var normalizeOptions = (options2 = {}) => ({
  cwd: toPath(options2.cwd) || import_node_process.default.cwd()
});
var isIgnoredByIgnoreFiles = async (patterns, options2) => {
  const { cwd } = normalizeOptions(options2);
  const paths = await (0, import_fast_glob.default)(patterns, { cwd, ...ignoreFilesGlobOptions });
  const files = await Promise.all(
    paths.map(async (filePath) => ({
      filePath,
      content: await import_node_fs.default.promises.readFile(filePath, "utf8")
    }))
  );
  return getIsIgnoredPredicate(files, cwd);
};
var isIgnoredByIgnoreFilesSync = (patterns, options2) => {
  const { cwd } = normalizeOptions(options2);
  const paths = import_fast_glob.default.sync(patterns, { cwd, ...ignoreFilesGlobOptions });
  const files = paths.map((filePath) => ({
    filePath,
    content: import_node_fs.default.readFileSync(filePath, "utf8")
  }));
  return getIsIgnoredPredicate(files, cwd);
};

// node_modules/.pnpm/globby@13.1.2/node_modules/globby/index.js
var assertPatternsInput = (patterns) => {
  if (patterns.some((pattern) => typeof pattern !== "string")) {
    throw new TypeError("Patterns must be a string or an array of strings");
  }
};
var toPatternsArray = (patterns) => {
  patterns = [...new Set([patterns].flat())];
  assertPatternsInput(patterns);
  return patterns;
};
var checkCwdOption = (options2) => {
  if (!options2.cwd) {
    return;
  }
  let stat;
  try {
    stat = import_node_fs2.default.statSync(options2.cwd);
  } catch {
    return;
  }
  if (!stat.isDirectory()) {
    throw new Error("The `cwd` option must be a path to a directory");
  }
};
var normalizeOptions2 = (options2 = {}) => {
  options2 = {
    ignore: [],
    expandDirectories: true,
    ...options2,
    cwd: toPath(options2.cwd)
  };
  checkCwdOption(options2);
  return options2;
};
var normalizeArguments = (fn) => async (patterns, options2) => fn(toPatternsArray(patterns), normalizeOptions2(options2));
var normalizeArgumentsSync = (fn) => (patterns, options2) => fn(toPatternsArray(patterns), normalizeOptions2(options2));
var getIgnoreFilesPatterns = (options2) => {
  const { ignoreFiles, gitignore } = options2;
  const patterns = ignoreFiles ? toPatternsArray(ignoreFiles) : [];
  if (gitignore) {
    patterns.push(GITIGNORE_FILES_PATTERN);
  }
  return patterns;
};
var getFilter = async (options2) => {
  const ignoreFilesPatterns = getIgnoreFilesPatterns(options2);
  return createFilterFunction(
    ignoreFilesPatterns.length > 0 && await isIgnoredByIgnoreFiles(ignoreFilesPatterns, { cwd: options2.cwd })
  );
};
var getFilterSync = (options2) => {
  const ignoreFilesPatterns = getIgnoreFilesPatterns(options2);
  return createFilterFunction(
    ignoreFilesPatterns.length > 0 && isIgnoredByIgnoreFilesSync(ignoreFilesPatterns, { cwd: options2.cwd })
  );
};
var createFilterFunction = (isIgnored) => {
  const seen = /* @__PURE__ */ new Set();
  return (fastGlobResult) => {
    const path4 = fastGlobResult.path || fastGlobResult;
    const pathKey = import_node_path2.default.normalize(path4);
    const seenOrIgnored = seen.has(pathKey) || isIgnored && isIgnored(path4);
    seen.add(pathKey);
    return !seenOrIgnored;
  };
};
var unionFastGlobResults = (results, filter) => results.flat().filter((fastGlobResult) => filter(fastGlobResult));
var unionFastGlobStreams = (streams, filter) => (0, import_merge2.default)(streams).pipe(new FilterStream((fastGlobResult) => filter(fastGlobResult)));
var convertNegativePatterns = (patterns, options2) => {
  const tasks = [];
  while (patterns.length > 0) {
    const index = patterns.findIndex((pattern) => isNegativePattern(pattern));
    if (index === -1) {
      tasks.push({ patterns, options: options2 });
      break;
    }
    const ignorePattern = patterns[index].slice(1);
    for (const task of tasks) {
      task.options.ignore.push(ignorePattern);
    }
    if (index !== 0) {
      tasks.push({
        patterns: patterns.slice(0, index),
        options: {
          ...options2,
          ignore: [
            ...options2.ignore,
            ignorePattern
          ]
        }
      });
    }
    patterns = patterns.slice(index + 1);
  }
  return tasks;
};
var getDirGlobOptions = (options2, cwd) => ({
  ...cwd ? { cwd } : {},
  ...Array.isArray(options2) ? { files: options2 } : options2
});
var generateTasks = async (patterns, options2) => {
  const globTasks = convertNegativePatterns(patterns, options2);
  const { cwd, expandDirectories } = options2;
  if (!expandDirectories) {
    return globTasks;
  }
  const patternExpandOptions = getDirGlobOptions(expandDirectories, cwd);
  const ignoreExpandOptions = cwd ? { cwd } : void 0;
  return Promise.all(
    globTasks.map(async (task) => {
      let { patterns: patterns2, options: options3 } = task;
      [
        patterns2,
        options3.ignore
      ] = await Promise.all([
        (0, import_dir_glob.default)(patterns2, patternExpandOptions),
        (0, import_dir_glob.default)(options3.ignore, ignoreExpandOptions)
      ]);
      return { patterns: patterns2, options: options3 };
    })
  );
};
var generateTasksSync = (patterns, options2) => {
  const globTasks = convertNegativePatterns(patterns, options2);
  const { cwd, expandDirectories } = options2;
  if (!expandDirectories) {
    return globTasks;
  }
  const patternExpandOptions = getDirGlobOptions(expandDirectories, cwd);
  const ignoreExpandOptions = cwd ? { cwd } : void 0;
  return globTasks.map((task) => {
    let { patterns: patterns2, options: options3 } = task;
    patterns2 = import_dir_glob.default.sync(patterns2, patternExpandOptions);
    options3.ignore = import_dir_glob.default.sync(options3.ignore, ignoreExpandOptions);
    return { patterns: patterns2, options: options3 };
  });
};
var globby = normalizeArguments(async (patterns, options2) => {
  const [
    tasks,
    filter
  ] = await Promise.all([
    generateTasks(patterns, options2),
    getFilter(options2)
  ]);
  const results = await Promise.all(tasks.map((task) => (0, import_fast_glob2.default)(task.patterns, task.options)));
  return unionFastGlobResults(results, filter);
});
var globbySync = normalizeArgumentsSync((patterns, options2) => {
  const tasks = generateTasksSync(patterns, options2);
  const filter = getFilterSync(options2);
  const results = tasks.map((task) => import_fast_glob2.default.sync(task.patterns, task.options));
  return unionFastGlobResults(results, filter);
});
var globbyStream = normalizeArgumentsSync((patterns, options2) => {
  const tasks = generateTasksSync(patterns, options2);
  const filter = getFilterSync(options2);
  const streams = tasks.map((task) => import_fast_glob2.default.stream(task.patterns, task.options));
  return unionFastGlobStreams(streams, filter);
});
var isDynamicPattern = normalizeArgumentsSync(
  (patterns, options2) => patterns.some((pattern) => import_fast_glob2.default.isDynamicPattern(pattern, options2))
);
var generateGlobTasks = normalizeArguments(generateTasks);
var generateGlobTasksSync = normalizeArgumentsSync(generateTasksSync);

// node_modules/.pnpm/@vuepress+utils@2.0.0-beta.51/node_modules/@vuepress/utils/dist/index.js
var import_hash_sum = __toESM(require_hash_sum());

// node_modules/.pnpm/ora@6.1.2/node_modules/ora/index.js
var import_node_process6 = __toESM(require_node_process());

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
var import_node_process3 = __toESM(require_node_process());

// node_modules/.pnpm/restore-cursor@4.0.0/node_modules/restore-cursor/index.js
var import_node_process2 = __toESM(require_node_process());
var import_onetime = __toESM(require_onetime());
var import_signal_exit = __toESM(require_signal_exit());
var restoreCursor = (0, import_onetime.default)(() => {
  (0, import_signal_exit.default)(() => {
    import_node_process2.default.stderr.write("\x1B[?25h");
  }, { alwaysLast: true });
});
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = import_node_process3.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = import_node_process3.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/.pnpm/ora@6.1.2/node_modules/ora/index.js
var import_cli_spinners = __toESM(require_cli_spinners());

// node_modules/.pnpm/log-symbols@5.1.0/node_modules/log-symbols/browser.js
var logSymbols = {
  info: "\u2139\uFE0F",
  success: "\u2705",
  warning: "\u26A0\uFE0F",
  error: "\u274C\uFE0F"
};
var browser_default2 = logSymbols;

// node_modules/.pnpm/ansi-regex@6.0.1/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.0.1/node_modules/strip-ansi/index.js
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(ansiRegex(), "");
}

// node_modules/.pnpm/ora@6.1.2/node_modules/ora/index.js
var import_wcwidth = __toESM(require_wcwidth());

// node_modules/.pnpm/is-interactive@2.0.0/node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env)
  );
}

// node_modules/.pnpm/is-unicode-supported@1.3.0/node_modules/is-unicode-supported/index.js
var import_node_process4 = __toESM(require_node_process());
function isUnicodeSupported() {
  if (import_node_process4.default.platform !== "win32") {
    return import_node_process4.default.env.TERM !== "linux";
  }
  return Boolean(import_node_process4.default.env.CI) || Boolean(import_node_process4.default.env.WT_SESSION) || Boolean(import_node_process4.default.env.TERMINUS_SUBLIME) || import_node_process4.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process4.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process4.default.env.TERM_PROGRAM === "vscode" || import_node_process4.default.env.TERM === "xterm-256color" || import_node_process4.default.env.TERM === "alacritty" || import_node_process4.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/ora@6.1.2/node_modules/ora/utilities.js
var import_node_process5 = __toESM(require_node_process(), 1);
var import_node_readline = __toESM(require_node_readline(), 1);
var import_bl = __toESM(require_bl(), 1);
var ASCII_ETX_CODE = 3;
var _requests, _mutedStream, _ourEmit, _rl;
var StdinDiscarder = class {
  constructor() {
    __privateAdd(this, _requests, 0);
    __privateAdd(this, _mutedStream, new import_bl.BufferListStream());
    __privateAdd(this, _ourEmit, void 0);
    __privateAdd(this, _rl, void 0);
    __privateGet(this, _mutedStream).pipe(import_node_process5.default.stdout);
    const self = this;
    __privateSet(this, _ourEmit, function(event, data, ...args) {
      const { stdin } = import_node_process5.default;
      if (__privateGet(self, _requests) > 0 || stdin.emit === __privateGet(self, _ourEmit)) {
        if (event === "keypress") {
          return;
        }
        if (event === "data" && data.includes(ASCII_ETX_CODE)) {
          import_node_process5.default.emit("SIGINT");
        }
        Reflect.apply(__privateGet(self, _ourEmit), this, [event, data, ...args]);
      } else {
        Reflect.apply(import_node_process5.default.stdin.emit, this, [event, data, ...args]);
      }
    });
  }
  start() {
    __privateWrapper(this, _requests)._++;
    if (__privateGet(this, _requests) === 1) {
      this._realStart();
    }
  }
  stop() {
    if (__privateGet(this, _requests) <= 0) {
      throw new Error("`stop` called more times than `start`");
    }
    __privateWrapper(this, _requests)._--;
    if (__privateGet(this, _requests) === 0) {
      this._realStop();
    }
  }
  _realStart() {
    if (import_node_process5.default.platform === "win32") {
      return;
    }
    __privateSet(this, _rl, import_node_readline.default.createInterface({
      input: import_node_process5.default.stdin,
      output: __privateGet(this, _mutedStream)
    }));
    __privateGet(this, _rl).on("SIGINT", () => {
      if (import_node_process5.default.listenerCount("SIGINT") === 0) {
        import_node_process5.default.emit("SIGINT");
      } else {
        __privateGet(this, _rl).close();
        import_node_process5.default.kill(import_node_process5.default.pid, "SIGINT");
      }
    });
  }
  _realStop() {
    if (import_node_process5.default.platform === "win32") {
      return;
    }
    __privateGet(this, _rl).close();
    __privateSet(this, _rl, void 0);
  }
};
_requests = new WeakMap();
_mutedStream = new WeakMap();
_ourEmit = new WeakMap();
_rl = new WeakMap();

// node_modules/.pnpm/ora@6.1.2/node_modules/ora/index.js
var stdinDiscarder;
var _linesToClear, _isDiscardingStdin, _lineCount, _frameIndex, _options, _spinner, _stream, _id, _initialInterval, _isEnabled, _isSilent, _indent, _text, _prefixText;
var Ora = class {
  constructor(options2) {
    __privateAdd(this, _linesToClear, 0);
    __privateAdd(this, _isDiscardingStdin, false);
    __privateAdd(this, _lineCount, 0);
    __privateAdd(this, _frameIndex, 0);
    __privateAdd(this, _options, void 0);
    __privateAdd(this, _spinner, void 0);
    __privateAdd(this, _stream, void 0);
    __privateAdd(this, _id, void 0);
    __privateAdd(this, _initialInterval, void 0);
    __privateAdd(this, _isEnabled, void 0);
    __privateAdd(this, _isSilent, void 0);
    __privateAdd(this, _indent, void 0);
    __privateAdd(this, _text, void 0);
    __privateAdd(this, _prefixText, void 0);
    __publicField(this, "color");
    if (!stdinDiscarder) {
      stdinDiscarder = new StdinDiscarder();
    }
    if (typeof options2 === "string") {
      options2 = {
        text: options2
      };
    }
    __privateSet(this, _options, {
      color: "cyan",
      stream: import_node_process6.default.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options2
    });
    this.color = __privateGet(this, _options).color;
    this.spinner = __privateGet(this, _options).spinner;
    __privateSet(this, _initialInterval, __privateGet(this, _options).interval);
    __privateSet(this, _stream, __privateGet(this, _options).stream);
    __privateSet(this, _isEnabled, typeof __privateGet(this, _options).isEnabled === "boolean" ? __privateGet(this, _options).isEnabled : isInteractive({ stream: __privateGet(this, _stream) }));
    __privateSet(this, _isSilent, typeof __privateGet(this, _options).isSilent === "boolean" ? __privateGet(this, _options).isSilent : false);
    this.text = __privateGet(this, _options).text;
    this.prefixText = __privateGet(this, _options).prefixText;
    this.indent = __privateGet(this, _options).indent;
    if (import_node_process6.default.env.NODE_ENV === "test") {
      this._stream = __privateGet(this, _stream);
      this._isEnabled = __privateGet(this, _isEnabled);
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return __privateGet(this, _linesToClear);
        },
        set(newValue) {
          __privateSet(this, _linesToClear, newValue);
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return __privateGet(this, _frameIndex);
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          return __privateGet(this, _lineCount);
        }
      });
    }
  }
  get indent() {
    return __privateGet(this, _indent);
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    __privateSet(this, _indent, indent);
    this.updateLineCount();
  }
  get interval() {
    return __privateGet(this, _initialInterval) || __privateGet(this, _spinner).interval || 100;
  }
  get spinner() {
    return __privateGet(this, _spinner);
  }
  set spinner(spinner) {
    __privateSet(this, _frameIndex, 0);
    __privateSet(this, _initialInterval, void 0);
    if (typeof spinner === "object") {
      if (spinner.frames === void 0) {
        throw new Error("The given spinner must have a `frames` property");
      }
      __privateSet(this, _spinner, spinner);
    } else if (!isUnicodeSupported()) {
      __privateSet(this, _spinner, import_cli_spinners.default.line);
    } else if (spinner === void 0) {
      __privateSet(this, _spinner, import_cli_spinners.default.dots);
    } else if (spinner !== "default" && import_cli_spinners.default[spinner]) {
      __privateSet(this, _spinner, import_cli_spinners.default[spinner]);
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return __privateGet(this, _text);
  }
  set text(value) {
    __privateSet(this, _text, value || "");
    this.updateLineCount();
  }
  get prefixText() {
    return __privateGet(this, _prefixText);
  }
  set prefixText(value) {
    __privateSet(this, _prefixText, value || "");
    this.updateLineCount();
  }
  get isSpinning() {
    return __privateGet(this, _id) !== void 0;
  }
  getFullPrefixText(prefixText = __privateGet(this, _prefixText), postfix = " ") {
    if (typeof prefixText === "string" && prefixText !== "") {
      return prefixText + postfix;
    }
    if (typeof prefixText === "function") {
      return prefixText() + postfix;
    }
    return "";
  }
  updateLineCount() {
    const columns = __privateGet(this, _stream).columns || 80;
    const fullPrefixText = this.getFullPrefixText(__privateGet(this, _prefixText), "-");
    __privateSet(this, _lineCount, 0);
    for (const line of stripAnsi(" ".repeat(__privateGet(this, _indent)) + fullPrefixText + "--" + __privateGet(this, _text)).split("\n")) {
      __privateSet(this, _lineCount, __privateGet(this, _lineCount) + Math.max(1, Math.ceil((0, import_wcwidth.default)(line) / columns)));
    }
  }
  get isEnabled() {
    return __privateGet(this, _isEnabled) && !__privateGet(this, _isSilent);
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    __privateSet(this, _isEnabled, value);
  }
  get isSilent() {
    return __privateGet(this, _isSilent);
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    __privateSet(this, _isSilent, value);
  }
  frame() {
    const { frames } = __privateGet(this, _spinner);
    let frame = frames[__privateGet(this, _frameIndex)];
    if (this.color) {
      frame = source_default[this.color](frame);
    }
    __privateSet(this, _frameIndex, ++__privateWrapper(this, _frameIndex)._ % frames.length);
    const fullPrefixText = typeof __privateGet(this, _prefixText) === "string" && __privateGet(this, _prefixText) !== "" ? __privateGet(this, _prefixText) + " " : "";
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    return fullPrefixText + frame + fullText;
  }
  clear() {
    if (!__privateGet(this, _isEnabled) || !__privateGet(this, _stream).isTTY) {
      return this;
    }
    __privateGet(this, _stream).cursorTo(0);
    for (let index = 0; index < __privateGet(this, _linesToClear); index++) {
      if (index > 0) {
        __privateGet(this, _stream).moveCursor(0, -1);
      }
      __privateGet(this, _stream).clearLine(1);
    }
    if (__privateGet(this, _indent) || this.lastIndent !== __privateGet(this, _indent)) {
      __privateGet(this, _stream).cursorTo(__privateGet(this, _indent));
    }
    this.lastIndent = __privateGet(this, _indent);
    __privateSet(this, _linesToClear, 0);
    return this;
  }
  render() {
    if (__privateGet(this, _isSilent)) {
      return this;
    }
    this.clear();
    __privateGet(this, _stream).write(this.frame());
    __privateSet(this, _linesToClear, __privateGet(this, _lineCount));
    return this;
  }
  start(text) {
    if (text) {
      this.text = text;
    }
    if (__privateGet(this, _isSilent)) {
      return this;
    }
    if (!__privateGet(this, _isEnabled)) {
      if (this.text) {
        __privateGet(this, _stream).write(`- ${this.text}
`);
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (__privateGet(this, _options).hideCursor) {
      cli_cursor_default.hide(__privateGet(this, _stream));
    }
    if (__privateGet(this, _options).discardStdin && import_node_process6.default.stdin.isTTY) {
      __privateSet(this, _isDiscardingStdin, true);
      stdinDiscarder.start();
    }
    this.render();
    __privateSet(this, _id, setInterval(this.render.bind(this), this.interval));
    return this;
  }
  stop() {
    if (!__privateGet(this, _isEnabled)) {
      return this;
    }
    clearInterval(__privateGet(this, _id));
    __privateSet(this, _id, void 0);
    __privateSet(this, _frameIndex, 0);
    this.clear();
    if (__privateGet(this, _options).hideCursor) {
      cli_cursor_default.show(__privateGet(this, _stream));
    }
    if (__privateGet(this, _options).discardStdin && import_node_process6.default.stdin.isTTY && __privateGet(this, _isDiscardingStdin)) {
      stdinDiscarder.stop();
      __privateSet(this, _isDiscardingStdin, false);
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: browser_default2.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: browser_default2.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: browser_default2.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: browser_default2.info, text });
  }
  stopAndPersist(options2 = {}) {
    if (__privateGet(this, _isSilent)) {
      return this;
    }
    const prefixText = options2.prefixText || __privateGet(this, _prefixText);
    const text = options2.text || this.text;
    const fullText = typeof text === "string" ? " " + text : "";
    this.stop();
    __privateGet(this, _stream).write(`${this.getFullPrefixText(prefixText, " ")}${options2.symbol || " "}${fullText}
`);
    return this;
  }
};
_linesToClear = new WeakMap();
_isDiscardingStdin = new WeakMap();
_lineCount = new WeakMap();
_frameIndex = new WeakMap();
_options = new WeakMap();
_spinner = new WeakMap();
_stream = new WeakMap();
_id = new WeakMap();
_initialInterval = new WeakMap();
_isEnabled = new WeakMap();
_isSilent = new WeakMap();
_indent = new WeakMap();
_text = new WeakMap();
_prefixText = new WeakMap();

// node_modules/.pnpm/@vuepress+utils@2.0.0-beta.51/node_modules/@vuepress/utils/dist/index.js
var import_upath = __toESM(require_upath());
var import_url = __toESM(require_url());
var import_upath2 = __toESM(require_upath());
var import_url2 = __toESM(require_url());
var import_upath3 = __toESM(require_upath());
var import_process = __toESM(require_process());
var info = (...args) => {
  console.log(source_default.cyan("info"), ...args);
};
var tip = (...args) => {
  console.log(source_default.blue("tip"), ...args);
};
var success = (...args) => {
  console.log(source_default.green("success"), ...args);
};
var warn = (...args) => {
  console.warn(source_default.yellow("warning"), ...args);
};
var error = (...args) => {
  console.error(source_default.red("error"), ...args);
};
var createError = (message) => {
  error(message);
  return new Error(message);
};
var logger = {
  info,
  tip,
  success,
  warn,
  error,
  createError
};

// node_modules/.pnpm/@mdit-vue+shared@0.10.0/node_modules/@mdit-vue/shared/dist/index.mjs
var htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
};
var htmlEscapeRegexp = /[&<>'"]/g;
var htmlEscape = (str2) => str2.replace(
  htmlEscapeRegexp,
  (char) => htmlEscapeMap[char]
);
var resolveTitleFromToken = (token, { shouldAllowHtml, shouldEscapeText }) => {
  var _a;
  const children = (_a = token.children) != null ? _a : [];
  const titleTokenTypes = ["text", "emoji", "code_inline"];
  if (shouldAllowHtml) {
    titleTokenTypes.push("html_inline");
  }
  const titleTokens = children.filter(
    (item) => {
      var _a2;
      return titleTokenTypes.includes(item.type) && !((_a2 = item.meta) == null ? void 0 : _a2.isPermalinkSymbol);
    }
  );
  return titleTokens.reduce((result, item) => {
    if (shouldEscapeText) {
      if (item.type === "code_inline" || item.type === "text") {
        return `${result}${htmlEscape(item.content)}`;
      }
    }
    return `${result}${item.content}`;
  }, "").trim();
};
var resolveHeadersFromTokens = (tokens, {
  level,
  shouldAllowHtml,
  shouldEscapeText,
  slugify: slugify2,
  format
}) => {
  var _a, _b;
  const headers = [];
  const stack = [];
  const push = (header) => {
    while (stack.length !== 0 && header.level <= stack[0].level) {
      stack.shift();
    }
    if (stack.length === 0) {
      headers.push(header);
      stack.push(header);
    } else {
      stack[0].children.push(header);
      stack.unshift(header);
    }
  };
  for (let i2 = 0; i2 < tokens.length; i2 += 1) {
    const token = tokens[i2];
    if ((token == null ? void 0 : token.type) !== "heading_open") {
      continue;
    }
    const headerLevel = Number.parseInt(token.tag.slice(1), 10);
    if (!level.includes(headerLevel)) {
      continue;
    }
    const nextToken = tokens[i2 + 1];
    if (!nextToken) {
      continue;
    }
    const title = resolveTitleFromToken(nextToken, {
      shouldAllowHtml,
      shouldEscapeText
    });
    const slug = (_a = token.attrGet("id")) != null ? _a : slugify2(title);
    push({
      level: headerLevel,
      title: (_b = format == null ? void 0 : format(title)) != null ? _b : title,
      slug,
      link: `#${slug}`,
      children: []
    });
  }
  return headers;
};
var rControl = /[\u0000-\u001f]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
var rCombining = /[\u0300-\u036F]/g;
var slugify = (str2) => str2.normalize("NFKD").replace(rCombining, "").replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();

// node_modules/.pnpm/@vuepress+markdown@2.0.0-beta.51/node_modules/@vuepress/markdown/dist/index.js
var import_markdown_it = __toESM(require_markdown_it());

// node_modules/.pnpm/@mdit-vue+plugin-component@0.10.0/node_modules/@mdit-vue/plugin-component/dist/index.mjs
var import_html_blocks = __toESM(require_html_blocks(), 1);
var attr_name = "[a-zA-Z_:@][a-zA-Z0-9:._-]*";
var unquoted = "[^\"'=<>`\\x00-\\x20]+";
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';
var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
var comment = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
var processing = "<[?][\\s\\S]*?[?]>";
var declaration = "<![A-Z]+\\s+[^>]*>";
var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTML_TAG_RE = new RegExp(
  "^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")"
);
var HTML_OPEN_CLOSE_TAG_RE = new RegExp(
  "^(?:" + open_tag + "|" + close_tag + ")"
);
var HTML_SELF_CLOSING_TAG_RE = new RegExp(
  "^<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/>"
);
var HTML_OPEN_AND_CLOSE_TAG_IN_THE_SAME_LINE_RE = new RegExp(
  "^<([A-Za-z][A-Za-z0-9\\-]*)" + attribute + "*\\s*>.*<\\/\\1\\s*>"
);
var TAGS_BLOCK = import_html_blocks.default;
var TAGS_INLINE = [
  "a",
  "abbr",
  "acronym",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "br",
  "button",
  "canvas",
  "cite",
  "code",
  "data",
  "datalist",
  "del",
  "dfn",
  "em",
  "embed",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "map",
  "mark",
  "meter",
  "noscript",
  "object",
  "output",
  "picture",
  "progress",
  "q",
  "ruby",
  "s",
  "samp",
  "script",
  "select",
  "slot",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "template",
  "textarea",
  "time",
  "u",
  "tt",
  "var",
  "video",
  "wbr"
];
var TAGS_VUE_RESERVED = [
  "template",
  "component",
  "transition",
  "transition-group",
  "keep-alive",
  "slot",
  "teleport"
];
var createHtmlSequences = ({
  blockTags,
  inlineTags
}) => {
  const forceBlockTags = [...blockTags, ...TAGS_BLOCK];
  const forceInlineTags = [
    ...inlineTags,
    ...TAGS_INLINE.filter((item) => !TAGS_VUE_RESERVED.includes(item))
  ];
  const HTML_SEQUENCES = [
    [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
    [/^<!--/, /-->/, true],
    [/^<\?/, /\?>/, true],
    [/^<![A-Z]/, />/, true],
    [/^<!\[CDATA\[/, /\]\]>/, true],
    [
      new RegExp("^</?(" + forceBlockTags.join("|") + ")(?=(\\s|/?>|$))", "i"),
      /^$/,
      true
    ],
    [
      new RegExp(
        "^</?(?!(" + forceInlineTags.join("|") + ")(?![\\w-]))[A-Za-z][A-Za-z0-9\\-]*(?=(\\s|/?>|$))"
      ),
      /^$/,
      true
    ],
    [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
  ];
  return HTML_SEQUENCES;
};
var createHtmlBlockRule = (options2) => {
  const HTML_SEQUENCES = createHtmlSequences(options2);
  return (state, startLine, endLine, silent) => {
    var _a;
    let i2;
    let nextLine;
    let lineText;
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (!state.md.options.html) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    lineText = state.src.slice(pos, max);
    for (i2 = 0; i2 < HTML_SEQUENCES.length; i2++) {
      if (HTML_SEQUENCES[i2][0].test(lineText)) {
        break;
      }
    }
    if (i2 === HTML_SEQUENCES.length) {
      return false;
    }
    if (silent) {
      return HTML_SEQUENCES[i2][2];
    }
    if (i2 === 6) {
      const match = (_a = lineText.match(HTML_SELF_CLOSING_TAG_RE)) != null ? _a : lineText.match(HTML_OPEN_AND_CLOSE_TAG_IN_THE_SAME_LINE_RE);
      if (match) {
        state.line = startLine + 1;
        let token2 = state.push("html_inline", "", 0);
        token2.content = match[0];
        token2.map = [startLine, state.line];
        token2 = state.push("inline", "", 0);
        token2.content = lineText.slice(match[0].length);
        token2.map = [startLine, state.line];
        token2.children = [];
        return true;
      }
    }
    nextLine = startLine + 1;
    if (!HTML_SEQUENCES[i2][1].test(lineText)) {
      for (; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        lineText = state.src.slice(pos, max);
        if (HTML_SEQUENCES[i2][1].test(lineText)) {
          if (lineText.length !== 0) {
            nextLine++;
          }
          break;
        }
      }
    }
    state.line = nextLine;
    const token = state.push("html_block", "", 0);
    token.map = [startLine, nextLine];
    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
    return true;
  };
};
var isLetter = (ch) => {
  const lc = ch | 32;
  return lc >= 97 && lc <= 122;
};
var htmlInlineRule = (state, silent) => {
  const { pos } = state;
  if (!state.md.options.html) {
    return false;
  }
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
    return false;
  }
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
    return false;
  }
  const match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) {
    return false;
  }
  if (!silent) {
    const token = state.push("html_inline", "", 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};
var componentPlugin = (md, { blockTags = [], inlineTags = [] } = {}) => {
  const htmlBlockRule = createHtmlBlockRule({
    blockTags,
    inlineTags
  });
  md.block.ruler.at("html_block", htmlBlockRule, {
    alt: ["paragraph", "reference", "blockquote"]
  });
  md.inline.ruler.at("html_inline", htmlInlineRule);
};

// node_modules/.pnpm/@mdit-vue+plugin-frontmatter@0.10.0/node_modules/@mdit-vue/plugin-frontmatter/dist/index.mjs
var import_gray_matter = __toESM(require_gray_matter(), 1);
var frontmatterPlugin = (md, { grayMatterOptions, renderExcerpt = true } = {}) => {
  const render = md.render.bind(md);
  md.render = (src, env = {}) => {
    const { data, content, excerpt = "" } = (0, import_gray_matter.default)(src, grayMatterOptions);
    env.content = content;
    env.frontmatter = {
      ...env.frontmatter,
      ...data
    };
    env.excerpt = renderExcerpt && excerpt ? render(excerpt, { ...env }) : excerpt;
    return render(content, env);
  };
};

// node_modules/.pnpm/@mdit-vue+plugin-headers@0.10.0/node_modules/@mdit-vue/plugin-headers/dist/index.mjs
var headersPlugin = (md, { level = [2, 3], slugify: slugify$1 = slugify, format } = {}) => {
  const render = md.renderer.render.bind(md.renderer);
  md.renderer.render = (tokens, options2, env) => {
    env.headers = resolveHeadersFromTokens(tokens, {
      level,
      shouldAllowHtml: false,
      shouldEscapeText: false,
      slugify: slugify$1,
      format
    });
    return render(tokens, options2, env);
  };
};

// node_modules/.pnpm/@mdit-vue+plugin-sfc@0.10.0/node_modules/@mdit-vue/plugin-sfc/dist/index.mjs
var TAG_NAME_SCRIPT = "script";
var TAG_NAME_STYLE = "style";
var TAG_NAME_TEMPLATE = "template";
var SCRIPT_SETUP_TAG_OPEN_REGEXP = /^<script\s+.*?\bsetup\b.*?>$/is;
var createSfcRegexp = ({
  customBlocks
}) => {
  const sfcTags = Array.from(
    /* @__PURE__ */ new Set([TAG_NAME_SCRIPT, TAG_NAME_STYLE, ...customBlocks])
  ).join("|");
  return new RegExp(
    `^\\s*(?<content>(?<tagOpen><(?<type>${sfcTags})\\s?.*?>)(?<contentStripped>.*)(?<tagClose><\\/\\k<type>\\s*>))\\s*$`,
    "is"
  );
};
var sfcPlugin = (md, { customBlocks = [] } = {}) => {
  const sfcRegexp = createSfcRegexp({ customBlocks });
  const render = md.render.bind(md);
  md.render = (src, env = {}) => {
    env.sfcBlocks = {
      template: null,
      script: null,
      scriptSetup: null,
      styles: [],
      customBlocks: []
    };
    const rendered = render(src, env);
    env.sfcBlocks.template = {
      type: TAG_NAME_TEMPLATE,
      content: `<${TAG_NAME_TEMPLATE}>${rendered}</${TAG_NAME_TEMPLATE}>`,
      contentStripped: rendered,
      tagOpen: `<${TAG_NAME_TEMPLATE}>`,
      tagClose: `</${TAG_NAME_TEMPLATE}>`
    };
    return rendered;
  };
  const htmlBlockRule = md.renderer.rules.html_block;
  md.renderer.rules.html_block = (tokens, idx, options2, env, self) => {
    if (!env.sfcBlocks) {
      return htmlBlockRule(tokens, idx, options2, env, self);
    }
    const token = tokens[idx];
    const content = token.content;
    const match = content.match(sfcRegexp);
    if (!match) {
      return htmlBlockRule(tokens, idx, options2, env, self);
    }
    const sfcBlock = match.groups;
    if (sfcBlock.type === TAG_NAME_SCRIPT) {
      if (SCRIPT_SETUP_TAG_OPEN_REGEXP.test(sfcBlock.tagOpen)) {
        env.sfcBlocks.scriptSetup = sfcBlock;
      } else {
        env.sfcBlocks.script = sfcBlock;
      }
    } else if (sfcBlock.type === TAG_NAME_STYLE) {
      env.sfcBlocks.styles.push(sfcBlock);
    } else {
      env.sfcBlocks.customBlocks.push(sfcBlock);
    }
    return "";
  };
};

// node_modules/.pnpm/@mdit-vue+plugin-title@0.10.0/node_modules/@mdit-vue/plugin-title/dist/index.mjs
var titlePlugin = (md) => {
  const render = md.renderer.render.bind(md.renderer);
  md.renderer.render = (tokens, options2, env) => {
    const tokenIdx = tokens.findIndex((token) => token.tag === "h1");
    env.title = tokenIdx > -1 ? resolveTitleFromToken(tokens[tokenIdx + 1], {
      shouldAllowHtml: false,
      shouldEscapeText: false
    }) : "";
    return render(tokens, options2, env);
  };
};

// node_modules/.pnpm/@mdit-vue+plugin-toc@0.10.0/node_modules/@mdit-vue/plugin-toc/dist/index.mjs
var createRenderHeaders = ({
  listTag,
  listClass,
  itemClass,
  linkTag,
  linkClass
}) => {
  const listTagString = htmlEscape(listTag);
  const listClassString = listClass ? ` class="${htmlEscape(listClass)}"` : "";
  const itemTagString = "li";
  const itemClassString = itemClass ? ` class="${htmlEscape(itemClass)}"` : "";
  const linkTagString = htmlEscape(linkTag);
  const linkClassString = linkClass ? ` class="${htmlEscape(linkClass)}"` : "";
  const linkTo = (slug) => linkTag === "router-link" ? ` to="#${slug}"` : ` href="#${slug}"`;
  const renderHeaders = (headers) => `<${listTagString}${listClassString}>${headers.map(
    (header) => `<${itemTagString}${itemClassString}${itemClassString}><${linkTagString}${linkClassString}${linkTo(header.slug)}>${header.title}</${linkTagString}>${header.children.length > 0 ? renderHeaders(header.children) : ""}</${itemTagString}>`
  ).join("")}</${listTagString}>`;
  return renderHeaders;
};
var createTocBlockRule = ({
  pattern,
  containerTag,
  containerClass
}) => {
  return (state, startLine, endLine, silent) => {
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const lineFirstToken = state.src.slice(pos, max).split(" ")[0];
    if (!pattern.test(lineFirstToken))
      return false;
    if (silent)
      return true;
    state.line = startLine + 1;
    const tokenOpen = state.push("toc_open", containerTag, 1);
    tokenOpen.markup = "";
    tokenOpen.map = [startLine, state.line];
    if (containerClass) {
      tokenOpen.attrSet("class", containerClass);
    }
    const tokenBody = state.push("toc_body", "", 0);
    tokenBody.markup = lineFirstToken;
    tokenBody.map = [startLine, state.line];
    tokenBody.hidden = true;
    const tokenClose = state.push("toc_close", containerTag, -1);
    tokenClose.markup = "";
    tokenBody.map = [startLine, state.line];
    return true;
  };
};
var tocPlugin = (md, {
  pattern = /^\[\[toc\]\]$/i,
  slugify: slugify$1 = slugify,
  format,
  level = [2, 3],
  containerTag = "nav",
  containerClass = "table-of-contents",
  listTag = "ul",
  listClass = "",
  itemClass = "",
  linkTag = "a",
  linkClass = ""
} = {}) => {
  md.block.ruler.before(
    "heading",
    "toc",
    createTocBlockRule({
      pattern,
      containerTag,
      containerClass
    }),
    {
      alt: ["paragraph", "reference", "blockquote"]
    }
  );
  const renderHeaders = createRenderHeaders({
    listTag,
    listClass,
    itemClass,
    linkTag,
    linkClass
  });
  md.renderer.rules.toc_body = (tokens) => renderHeaders(
    resolveHeadersFromTokens(tokens, {
      level,
      shouldAllowHtml: true,
      shouldEscapeText: true,
      slugify: slugify$1,
      format
    })
  );
};

// node_modules/.pnpm/markdown-it-anchor@8.6.5_ea7kj7wzjkld5jo2noyjqxi764/node_modules/markdown-it-anchor/dist/markdownItAnchor.mjs
var e = false;
var n = { false: "push", true: "unshift", after: "push", before: "unshift" };
var t = { isPermalinkSymbol: true };
function r(r2, a2, i2, l2) {
  var o2;
  if (!e) {
    var c2 = "Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#todo-anchor-or-file";
    "object" == typeof process && process && process.emitWarning ? process.emitWarning(c2) : console.warn(c2), e = true;
  }
  var s2 = [Object.assign(new i2.Token("link_open", "a", 1), { attrs: [].concat(a2.permalinkClass ? [["class", a2.permalinkClass]] : [], [["href", a2.permalinkHref(r2, i2)]], Object.entries(a2.permalinkAttrs(r2, i2))) }), Object.assign(new i2.Token("html_block", "", 0), { content: a2.permalinkSymbol, meta: t }), new i2.Token("link_close", "a", -1)];
  a2.permalinkSpace && i2.tokens[l2 + 1].children[n[a2.permalinkBefore]](Object.assign(new i2.Token("text", "", 0), { content: " " })), (o2 = i2.tokens[l2 + 1].children)[n[a2.permalinkBefore]].apply(o2, s2);
}
function a(e2) {
  return "#" + e2;
}
function i(e2) {
  return {};
}
var l = { class: "header-anchor", symbol: "#", renderHref: a, renderAttrs: i };
function o(e2) {
  function n2(t2) {
    return t2 = Object.assign({}, n2.defaults, t2), function(n3, r2, a2, i2) {
      return e2(n3, t2, r2, a2, i2);
    };
  }
  return n2.defaults = Object.assign({}, l), n2.renderPermalinkImpl = e2, n2;
}
var c = o(function(e2, r2, a2, i2, l2) {
  var o2, c2 = [Object.assign(new i2.Token("link_open", "a", 1), { attrs: [].concat(r2.class ? [["class", r2.class]] : [], [["href", r2.renderHref(e2, i2)]], r2.ariaHidden ? [["aria-hidden", "true"]] : [], Object.entries(r2.renderAttrs(e2, i2))) }), Object.assign(new i2.Token("html_inline", "", 0), { content: r2.symbol, meta: t }), new i2.Token("link_close", "a", -1)];
  if (r2.space) {
    var s2 = "string" == typeof r2.space ? r2.space : " ";
    i2.tokens[l2 + 1].children[n[r2.placement]](Object.assign(new i2.Token("string" == typeof r2.space ? "html_inline" : "text", "", 0), { content: s2 }));
  }
  (o2 = i2.tokens[l2 + 1].children)[n[r2.placement]].apply(o2, c2);
});
Object.assign(c.defaults, { space: true, placement: "after", ariaHidden: false });
var s = o(c.renderPermalinkImpl);
s.defaults = Object.assign({}, c.defaults, { ariaHidden: true });
var u = o(function(e2, n2, t2, r2, a2) {
  var i2 = [Object.assign(new r2.Token("link_open", "a", 1), { attrs: [].concat(n2.class ? [["class", n2.class]] : [], [["href", n2.renderHref(e2, r2)]], Object.entries(n2.renderAttrs(e2, r2))) })].concat(n2.safariReaderFix ? [new r2.Token("span_open", "span", 1)] : [], r2.tokens[a2 + 1].children, n2.safariReaderFix ? [new r2.Token("span_close", "span", -1)] : [], [new r2.Token("link_close", "a", -1)]);
  r2.tokens[a2 + 1] = Object.assign(new r2.Token("inline", "", 0), { children: i2 });
});
Object.assign(u.defaults, { safariReaderFix: false });
var d = o(function(e2, r2, a2, i2, l2) {
  var o2;
  if (!["visually-hidden", "aria-label", "aria-describedby", "aria-labelledby"].includes(r2.style))
    throw new Error("`permalink.linkAfterHeader` called with unknown style option `" + r2.style + "`");
  if (!["aria-describedby", "aria-labelledby"].includes(r2.style) && !r2.assistiveText)
    throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `" + r2.style + "` style");
  if ("visually-hidden" === r2.style && !r2.visuallyHiddenClass)
    throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");
  var c2 = i2.tokens[l2 + 1].children.filter(function(e3) {
    return "text" === e3.type || "code_inline" === e3.type;
  }).reduce(function(e3, n2) {
    return e3 + n2.content;
  }, ""), s2 = [], u2 = [];
  if (r2.class && u2.push(["class", r2.class]), u2.push(["href", r2.renderHref(e2, i2)]), u2.push.apply(u2, Object.entries(r2.renderAttrs(e2, i2))), "visually-hidden" === r2.style) {
    if (s2.push(Object.assign(new i2.Token("span_open", "span", 1), { attrs: [["class", r2.visuallyHiddenClass]] }), Object.assign(new i2.Token("text", "", 0), { content: r2.assistiveText(c2) }), new i2.Token("span_close", "span", -1)), r2.space) {
      var d2 = "string" == typeof r2.space ? r2.space : " ";
      s2[n[r2.placement]](Object.assign(new i2.Token("string" == typeof r2.space ? "html_inline" : "text", "", 0), { content: d2 }));
    }
    s2[n[r2.placement]](Object.assign(new i2.Token("span_open", "span", 1), { attrs: [["aria-hidden", "true"]] }), Object.assign(new i2.Token("html_inline", "", 0), { content: r2.symbol, meta: t }), new i2.Token("span_close", "span", -1));
  } else
    s2.push(Object.assign(new i2.Token("html_inline", "", 0), { content: r2.symbol, meta: t }));
  "aria-label" === r2.style ? u2.push(["aria-label", r2.assistiveText(c2)]) : ["aria-describedby", "aria-labelledby"].includes(r2.style) && u2.push([r2.style, e2]);
  var f2 = [Object.assign(new i2.Token("link_open", "a", 1), { attrs: u2 })].concat(s2, [new i2.Token("link_close", "a", -1)]);
  (o2 = i2.tokens).splice.apply(o2, [l2 + 3, 0].concat(f2)), r2.wrapper && (i2.tokens.splice(l2, 0, Object.assign(new i2.Token("html_block", "", 0), { content: r2.wrapper[0] + "\n" })), i2.tokens.splice(l2 + 3 + f2.length + 1, 0, Object.assign(new i2.Token("html_block", "", 0), { content: r2.wrapper[1] + "\n" })));
});
function f(e2, n2, t2, r2) {
  var a2 = e2, i2 = r2;
  if (t2 && Object.prototype.hasOwnProperty.call(n2, a2))
    throw new Error("User defined `id` attribute `" + e2 + "` is not unique. Please fix it in your Markdown to continue.");
  for (; Object.prototype.hasOwnProperty.call(n2, a2); )
    a2 = e2 + "-" + i2, i2 += 1;
  return n2[a2] = true, a2;
}
function b(e2, n2) {
  n2 = Object.assign({}, b.defaults, n2), e2.core.ruler.push("anchor", function(e3) {
    for (var t2, a2 = {}, i2 = e3.tokens, l2 = Array.isArray(n2.level) ? (t2 = n2.level, function(e4) {
      return t2.includes(e4);
    }) : function(e4) {
      return function(n3) {
        return n3 >= e4;
      };
    }(n2.level), o2 = 0; o2 < i2.length; o2++) {
      var c2 = i2[o2];
      if ("heading_open" === c2.type && l2(Number(c2.tag.substr(1)))) {
        var s2 = n2.getTokensText(i2[o2 + 1].children), u2 = c2.attrGet("id");
        u2 = null == u2 ? f(n2.slugify(s2), a2, false, n2.uniqueSlugStartIndex) : f(u2, a2, true, n2.uniqueSlugStartIndex), c2.attrSet("id", u2), false !== n2.tabIndex && c2.attrSet("tabindex", "" + n2.tabIndex), "function" == typeof n2.permalink ? n2.permalink(u2, n2, e3, o2) : (n2.permalink || n2.renderPermalink && n2.renderPermalink !== r) && n2.renderPermalink(u2, n2, e3, o2), o2 = i2.indexOf(c2), n2.callback && n2.callback(c2, { slug: u2, title: s2 });
      }
    }
  });
}
Object.assign(d.defaults, { style: "visually-hidden", space: true, placement: "after", wrapper: null }), b.permalink = { __proto__: null, legacy: r, renderHref: a, renderAttrs: i, makePermalink: o, linkInsideHeader: c, ariaHidden: s, headerLink: u, linkAfterHeader: d }, b.defaults = { level: 1, slugify: function(e2) {
  return encodeURIComponent(String(e2).trim().toLowerCase().replace(/\s+/g, "-"));
}, uniqueSlugStartIndex: 1, tabIndex: "-1", getTokensText: function(e2) {
  return e2.filter(function(e3) {
    return ["text", "code_inline"].includes(e3.type);
  }).map(function(e3) {
    return e3.content;
  }).join("");
}, permalink: false, renderPermalink: r, permalinkClass: s.defaults.class, permalinkSpace: s.defaults.space, permalinkSymbol: "\xB6", permalinkBefore: "before" === s.defaults.placement, permalinkHref: s.defaults.renderHref, permalinkAttrs: s.defaults.renderAttrs }, b.default = b;
var markdownItAnchor_default = b;

// node_modules/.pnpm/@vuepress+markdown@2.0.0-beta.51/node_modules/@vuepress/markdown/dist/index.js
var import_mdurl = __toESM(require_mdurl());
var import_markdown_it_emoji = __toESM(require_markdown_it_emoji());
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var resolveLink = (link, relativePathPrefix, env) => {
  let resolvedLink = (0, import_mdurl.decode)(link);
  if (/^\.{1,2}\//.test(link) && env.filePathRelative) {
    resolvedLink = `${relativePathPrefix}/${import_upath.default.join(
      import_upath.default.dirname(env.filePathRelative),
      resolvedLink
    )}`;
  }
  return resolvedLink;
};
var assetsPlugin = (md, { relativePathPrefix = "@source" } = {}) => {
  const rawImageRule = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options2, env, self) => {
    const token = tokens[idx];
    const link = token.attrGet("src");
    if (link) {
      token.attrSet("src", resolveLink(link, relativePathPrefix, env));
    }
    return rawImageRule(tokens, idx, options2, env, self);
  };
  const createHtmlRule = (rawHtmlRule) => (tokens, idx, options2, env, self) => {
    tokens[idx].content = tokens[idx].content.replace(
      /(<img\b.*?src=")([^"]*)(")/gs,
      (_, prefix, src, suffix) => `${prefix}${resolveLink(
        src.trim(),
        relativePathPrefix,
        env
      )}${suffix}`
    ).replace(
      /(<img\b.*?srcset=")([^"]*)(")/gs,
      (_, prefix, srcset, suffix) => `${prefix}${srcset.split(",").map(
        (item) => item.trim().replace(
          /^([^ ]*?)([ \n].*)?$/,
          (_2, url, descriptor = "") => `${resolveLink(
            url.trim(),
            relativePathPrefix,
            env
          )}${descriptor.replace(/[ \n]+/g, " ").trimEnd()}`
        )
      ).join(", ")}${suffix}`
    );
    return rawHtmlRule(tokens, idx, options2, env, self);
  };
  const rawHtmlBlockRule = md.renderer.rules.html_block;
  const rawHtmlInlineRule = md.renderer.rules.html_inline;
  md.renderer.rules.html_block = createHtmlRule(rawHtmlBlockRule);
  md.renderer.rules.html_inline = createHtmlRule(rawHtmlInlineRule);
};
var resolveHighlightLines = (info2) => {
  const match = info2.match(/{([\d,-]+)}/);
  if (match === null) {
    return null;
  }
  return match[1].split(",").map((item) => {
    const range = item.split("-");
    if (range.length === 1) {
      range.push(range[0]);
    }
    return range.map((str2) => Number.parseInt(str2, 10));
  });
};
var isHighlightLine = (lineNumber, ranges) => ranges.some(([start, end]) => lineNumber >= start && lineNumber <= end);
var languages_exports = {};
__export(languages_exports, {
  languageBash: () => languageBash,
  languageCsharp: () => languageCsharp,
  languageDocker: () => languageDocker,
  languageFsharp: () => languageFsharp,
  languageJavascript: () => languageJavascript,
  languageKotlin: () => languageKotlin,
  languageMarkdown: () => languageMarkdown,
  languagePython: () => languagePython,
  languageRuby: () => languageRuby,
  languageRust: () => languageRust,
  languageStylus: () => languageStylus,
  languageTypescript: () => languageTypescript,
  languageYaml: () => languageYaml
});
var languageBash = {
  name: "bash",
  ext: "sh",
  aliases: ["bash", "sh", "shell", "zsh"]
};
var languageCsharp = {
  name: "csharp",
  ext: "cs",
  aliases: ["cs", "csharp"]
};
var languageDocker = {
  name: "docker",
  ext: "docker",
  aliases: ["docker", "dockerfile"]
};
var languageFsharp = {
  name: "fsharp",
  ext: "fs",
  aliases: ["fs", "fsharp"]
};
var languageJavascript = {
  name: "javascript",
  ext: "js",
  aliases: ["javascript", "js"]
};
var languageKotlin = {
  name: "kotlin",
  ext: "kt",
  aliases: ["kotlin", "kt"]
};
var languageMarkdown = {
  name: "markdown",
  ext: "md",
  aliases: ["markdown", "md"]
};
var languagePython = {
  name: "python",
  ext: "py",
  aliases: ["py", "python"]
};
var languageRuby = {
  name: "ruby",
  ext: "rb",
  aliases: ["rb", "ruby"]
};
var languageRust = {
  name: "rust",
  ext: "rs",
  aliases: ["rs", "rust"]
};
var languageStylus = {
  name: "stylus",
  ext: "styl",
  aliases: ["styl", "stylus"]
};
var languageTypescript = {
  name: "typescript",
  ext: "ts",
  aliases: ["ts", "typescript"]
};
var languageYaml = {
  name: "yaml",
  ext: "yml",
  aliases: ["yaml", "yml"]
};
var languagesMap;
var getLanguagesMap = () => {
  if (!languagesMap) {
    languagesMap = Object.values(languages_exports).reduce((result, item) => {
      item.aliases.forEach((alias) => {
        result[alias] = item;
      });
      return result;
    }, {});
  }
  return languagesMap;
};
var resolveLanguage = (info2) => {
  var _a, _b;
  const alias = ((_a = info2.match(/^([^ :[{]+)/)) == null ? void 0 : _a[1]) || "text";
  return (_b = getLanguagesMap()[alias]) != null ? _b : {
    name: alias,
    ext: alias,
    aliases: [alias]
  };
};
var resolveLineNumbers = (info2) => {
  if (/:line-numbers\b/.test(info2)) {
    return true;
  }
  if (/:no-line-numbers\b/.test(info2)) {
    return false;
  }
  return null;
};
var resolveVPre = (info2) => {
  if (/:v-pre\b/.test(info2)) {
    return true;
  }
  if (/:no-v-pre\b/.test(info2)) {
    return false;
  }
  return null;
};
var codePlugin = (md, {
  highlightLines = true,
  lineNumbers = true,
  preWrapper = true,
  vPre: { block: vPreBlock = true, inline: vPreInline = true } = {}
} = {}) => {
  md.renderer.rules.fence = (tokens, idx, options2, env, slf) => {
    var _a, _b, _c;
    const token = tokens[idx];
    const info2 = token.info ? md.utils.unescapeAll(token.info).trim() : "";
    const language = resolveLanguage(info2);
    const languageClass = `${options2.langPrefix}${language.name}`;
    const code = ((_a = options2.highlight) == null ? void 0 : _a.call(options2, token.content, language.name, "")) || md.utils.escapeHtml(token.content);
    let result = code.startsWith("<pre") ? code : `<pre class="${languageClass}"><code>${code}</code></pre>`;
    const useVPre = (_b = resolveVPre(info2)) != null ? _b : vPreBlock;
    if (useVPre) {
      result = `<pre v-pre${result.slice("<pre".length)}`;
    }
    if (!preWrapper) {
      return result;
    }
    const lines = code.split("\n").slice(0, -1);
    const highlightLinesRanges = highlightLines ? resolveHighlightLines(info2) : null;
    if (highlightLinesRanges) {
      const highlightLinesCode = lines.map((_, index) => {
        if (isHighlightLine(index + 1, highlightLinesRanges)) {
          return '<div class="highlight-line">&nbsp;</div>';
        }
        return "<br>";
      }).join("");
      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`;
    }
    const useLineNumbers = (_c = resolveLineNumbers(info2)) != null ? _c : typeof lineNumbers === "number" ? lines.length >= lineNumbers : lineNumbers;
    if (useLineNumbers) {
      const lineNumbersCode = lines.map(() => `<div class="line-number"></div>`).join("");
      result = `${result}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`;
    }
    result = `<div class="${languageClass} ext-${language.ext}${useLineNumbers ? " line-numbers-mode" : ""}">${result}</div>`;
    return result;
  };
  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline;
    md.renderer.rules.code_inline = (tokens, idx, options2, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options2, env, slf);
      return `<code v-pre${result.slice("<code".length)}`;
    };
  }
};
var MIN_LENGTH = 9;
var START_CODES = [64, 91, 99, 111, 100, 101];
var SYNTAX_RE = /^@\[code(?:{(?:(\d+)?-(\d+)?)})?(?: ([^\]]+))?\]\(([^)]*)\)/;
var createImportCodeBlockRule = ({ handleImportPath = (str2) => str2 }) => (state, startLine, endLine, silent) => {
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  if (pos + MIN_LENGTH > max)
    return false;
  for (let i2 = 0; i2 < START_CODES.length; i2 += 1) {
    if (state.src.charCodeAt(pos + i2) !== START_CODES[i2]) {
      return false;
    }
  }
  const match = state.src.slice(pos, max).match(SYNTAX_RE);
  if (!match)
    return false;
  if (silent)
    return true;
  const [, lineStart, lineEnd, info2, importPath] = match;
  const meta = {
    importPath: handleImportPath(importPath),
    lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
    lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : void 0
  };
  const token = state.push("import_code", "code", 0);
  token.info = info2 != null ? info2 : import_upath.default.extname(meta.importPath).slice(1);
  token.markup = "```";
  token.map = [startLine, startLine + 1];
  token.meta = meta;
  state.line = startLine + 1;
  return true;
};
var resolveImportCode = ({ importPath, lineStart, lineEnd }, { filePath }) => {
  let importFilePath = importPath;
  if (!import_upath.default.isAbsolute(importPath)) {
    if (!filePath) {
      return {
        importFilePath: null,
        importCode: "Error when resolving path"
      };
    }
    importFilePath = import_upath.default.resolve(filePath, "..", importPath);
  }
  if (!import_fs_extra.default.existsSync(importFilePath)) {
    return {
      importFilePath,
      importCode: "File not found"
    };
  }
  const fileContent = import_fs_extra.default.readFileSync(importFilePath).toString();
  return {
    importFilePath,
    importCode: fileContent.split("\n").slice(lineStart ? lineStart - 1 : lineStart, lineEnd).join("\n").replace(/\n?$/, "\n")
  };
};
var importCodePlugin = (md, options2 = {}) => {
  md.block.ruler.before(
    "fence",
    "import_code",
    createImportCodeBlockRule(options2),
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  );
  md.renderer.rules.import_code = (tokens, idx, options22, env, slf) => {
    const token = tokens[idx];
    const { importFilePath, importCode } = resolveImportCode(token.meta, env);
    token.content = importCode;
    if (importFilePath) {
      const importedFiles = env.importedFiles || (env.importedFiles = []);
      importedFiles.push(importFilePath);
    }
    return md.renderer.rules.fence(tokens, idx, options22, env, slf);
  };
};
var resolvePaths = (rawPath, base, filePathRelative) => {
  let absolutePath;
  let relativePath;
  if (rawPath.startsWith("/")) {
    if (rawPath.endsWith(".md")) {
      absolutePath = import_upath.default.join(base, rawPath);
      relativePath = removeLeadingSlash(rawPath);
    } else {
      absolutePath = rawPath;
      relativePath = import_upath.default.relative(base, absolutePath);
    }
  } else {
    if (filePathRelative) {
      relativePath = import_upath.default.join(
        import_upath.default.dirname(encodeURI(filePathRelative)),
        rawPath
      );
      absolutePath = import_upath.default.join(base, relativePath);
    } else {
      relativePath = rawPath.replace(/^(?:\.\/)?(.*)$/, "$1");
      absolutePath = relativePath;
    }
  }
  return {
    absolutePath,
    relativePath
  };
};
var linksPlugin = (md, options2 = {}) => {
  const internalTag = options2.internalTag || "RouterLink";
  const externalAttrs = {
    target: "_blank",
    rel: "noopener noreferrer",
    ...options2.externalAttrs
  };
  let hasOpenInternalLink = false;
  const handleLinkOpen = (tokens, idx, env) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");
    if (hrefIndex < 0) {
      return;
    }
    const hrefAttr = token.attrs[hrefIndex];
    const hrefLink = hrefAttr[1];
    const { base = "/", filePathRelative = null } = env;
    if (isLinkExternal(hrefLink, base)) {
      Object.entries(externalAttrs).forEach(
        ([key, val]) => token.attrSet(key, val)
      );
      return;
    }
    const internalLinkMatch = hrefLink.match(
      /^((?:.*)(?:\/|\.md|\.html))(#.*)?$/
    );
    if (!internalLinkMatch) {
      return;
    }
    const rawPath = internalLinkMatch[1];
    const rawHash = internalLinkMatch[2] || "";
    const { relativePath, absolutePath } = resolvePaths(
      rawPath,
      base,
      filePathRelative
    );
    const normalizedPath = absolutePath.replace(new RegExp(`^${base}`), "/").replace(/(^|\/)(README|index).md$/i, "$1").replace(/\.md$/, ".html");
    if (internalTag === "RouterLink") {
      token.tag = internalTag;
      hrefAttr[0] = "to";
      hasOpenInternalLink = true;
    }
    hrefAttr[1] = `${normalizedPath}${rawHash}`;
    const links = env.links || (env.links = []);
    links.push({
      raw: hrefLink,
      relative: relativePath,
      absolute: absolutePath
    });
  };
  md.renderer.rules.link_open = (tokens, idx, options22, env, self) => {
    handleLinkOpen(tokens, idx, env);
    return self.renderToken(tokens, idx, options22);
  };
  md.renderer.rules.link_close = (tokens, idx, options22, env, self) => {
    if (hasOpenInternalLink) {
      hasOpenInternalLink = false;
      tokens[idx].tag = internalTag;
    }
    return self.renderToken(tokens, idx, options22);
  };
};
var createMarkdown = ({
  anchor,
  assets,
  code,
  component,
  emoji,
  frontmatter,
  headers,
  title,
  importCode,
  links,
  sfc,
  slugify: slugify2 = slugify,
  toc,
  ...markdownItOptions
} = {}) => {
  const md = (0, import_markdown_it.default)({
    ...markdownItOptions,
    html: true
  });
  if (anchor !== false) {
    md.use(markdownItAnchor_default, {
      level: [1, 2, 3, 4, 5, 6],
      slugify: slugify2,
      permalink: markdownItAnchor_default.permalink.ariaHidden({
        class: "header-anchor",
        symbol: "#",
        space: true,
        placement: "before"
      }),
      ...anchor
    });
  }
  if (assets !== false) {
    md.use(assetsPlugin, assets);
  }
  if (code !== false) {
    md.use(codePlugin, code);
  }
  if (component !== false) {
    md.use(componentPlugin);
  }
  if (emoji !== false) {
    md.use(import_markdown_it_emoji.default, emoji);
  }
  if (frontmatter !== false) {
    md.use(frontmatterPlugin, {
      ...frontmatter,
      grayMatterOptions: {
        excerpt: true,
        excerpt_separator: "<!-- more -->",
        ...frontmatter == null ? void 0 : frontmatter.grayMatterOptions
      }
    });
  }
  if (headers !== false) {
    md.use(headersPlugin, {
      level: [2, 3],
      slugify: slugify2,
      ...headers
    });
  }
  if (importCode !== false) {
    md.use(importCodePlugin, importCode);
  }
  if (links !== false) {
    md.use(linksPlugin, links);
  }
  if (sfc !== false) {
    md.use(sfcPlugin, sfc);
  }
  if (toc !== false) {
    md.use(tocPlugin, {
      level: [2, 3],
      slugify: slugify2,
      linkTag: "router-link",
      ...toc
    });
  }
  if (title !== false) {
    md.use(titlePlugin);
  }
  return md;
};

// node_modules/.pnpm/@vuepress+core@2.0.0-beta.51/node_modules/@vuepress/core/dist/index.js
var import_module = __toESM(require_module(), 1);
var import_module2 = __toESM(require_module(), 1);
var import_module3 = __toESM(require_module(), 1);
var prepareClientConfigs = async (app) => {
  const clientConfigFiles = await app.pluginApi.hooks.clientConfigFile.process(
    app
  );
  const content = `${clientConfigFiles.map((filePath, index) => `import clientConfig${index} from '${filePath}'`).join("\n")}

export const clientConfigs = [
${clientConfigFiles.map((_, index) => `  clientConfig${index},`).join("\n")}
]
`;
  await app.writeTemp("internal/clientConfigs.js", content);
};
var preparePageComponent = async (app, page) => {
  var _a, _b, _c, _d, _e;
  await app.writeTemp(
    page.componentFilePathRelative,
    [
      `${(_a = page.sfcBlocks.template) == null ? void 0 : _a.tagOpen}<div>${(_b = page.sfcBlocks.template) == null ? void 0 : _b.contentStripped}</div>${(_c = page.sfcBlocks.template) == null ? void 0 : _c.tagClose}
`,
      (_d = page.sfcBlocks.script) == null ? void 0 : _d.content,
      (_e = page.sfcBlocks.scriptSetup) == null ? void 0 : _e.content,
      ...page.sfcBlocks.styles.map((item) => item.content),
      ...page.sfcBlocks.customBlocks.map((item) => item.content)
    ].join("\n")
  );
};
var HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
`;
var preparePageData = async (app, page) => {
  let content = `export const data = JSON.parse(${JSON.stringify(
    JSON.stringify(page.data)
  )})
`;
  if (app.env.isDev) {
    content += HMR_CODE;
  }
  await app.writeTemp(page.dataFilePathRelative, content);
};
var preparePagesComponents = async (app) => {
  const content = `import { defineAsyncComponent } from 'vue'

export const pagesComponents = {${app.pages.map(
    ({ key, path: path9, componentFilePath, componentFileChunkName }) => `
  // path: ${path9}
  ${JSON.stringify(key)}: defineAsyncComponent(() => import(${componentFileChunkName ? `/* webpackChunkName: "${componentFileChunkName}" */` : ""}${JSON.stringify(componentFilePath)})),`
  ).join("")}
}
`;
  await app.writeTemp("internal/pagesComponents.js", content);
};
var preparePagesData = async (app) => {
  const content = `export const pagesData = {${app.pages.map(
    ({ key, path: path9, dataFilePath, dataFileChunkName }) => `
  // path: ${path9}
  ${JSON.stringify(key)}: () => import(${dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ""}${JSON.stringify(dataFilePath)}).then(({ data }) => data),`
  ).join("")}
}
`;
  await app.writeTemp("internal/pagesData.js", content);
};
var resolvePageRouteItem = ({
  key,
  path: path9,
  pathInferred,
  filePathRelative,
  routeMeta
}) => {
  const redirectsSet = /* @__PURE__ */ new Set();
  redirectsSet.add(decodeURI(path9));
  if (path9.endsWith("/")) {
    redirectsSet.add(path9 + "index.html");
  } else {
    redirectsSet.add(path9.replace(/.html$/, ""));
  }
  if (pathInferred !== null) {
    redirectsSet.add(pathInferred);
    redirectsSet.add(encodeURI(pathInferred));
  }
  if (filePathRelative !== null) {
    const filenamePath = ensureLeadingSlash(filePathRelative);
    redirectsSet.add(filenamePath);
    redirectsSet.add(encodeURI(filenamePath));
  }
  redirectsSet.delete(path9);
  return [key, path9, routeMeta, [...redirectsSet]];
};
var preparePagesRoutes = async (app) => {
  const routeItems = app.pages.map(resolvePageRouteItem);
  const content = `export const pagesRoutes = [${routeItems.map((routeItem) => `
  ${JSON.stringify(routeItem)},`).join("")}
]
`;
  await app.writeTemp("internal/pagesRoutes.js", content);
};
var HMR_CODE2 = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
`;
var prepareSiteData = async (app) => {
  let content = `export const siteData = JSON.parse(${JSON.stringify(
    JSON.stringify(app.siteData)
  )})
`;
  if (app.env.isDev) {
    content += HMR_CODE2;
  }
  await app.writeTemp("internal/siteData.js", content);
};
var resolveAppMarkdown = async (app) => {
  await app.pluginApi.hooks.extendsMarkdownOptions.process(
    app.options.markdown,
    app
  );
  const markdown = createMarkdown(app.options.markdown);
  await app.pluginApi.hooks.extendsMarkdown.process(markdown, app);
  return markdown;
};
var inferPagePath = ({
  app,
  filePathRelative
}) => {
  if (!filePathRelative) {
    return {
      pathInferred: null,
      pathLocale: "/"
    };
  }
  const pathInferred = ensureLeadingSlash(filePathRelative).replace(/\.md$/, ".html").replace(/\/(README|index).html$/i, "/");
  const pathLocale = resolveLocalePath(app.siteData.locales, pathInferred);
  return {
    pathInferred,
    pathLocale
  };
};
var renderPageContent = async ({
  app,
  content,
  filePath,
  filePathRelative,
  options: options2
}) => {
  var _a;
  const markdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter: { ...options2.frontmatter }
  };
  const contentRendered = app.markdown.render(content, markdownEnv);
  const {
    excerpt = "",
    frontmatter = {},
    headers = [],
    importedFiles = [],
    links = [],
    sfcBlocks = {
      template: null,
      script: null,
      scriptSetup: null,
      styles: [],
      customBlocks: []
    },
    title = ""
  } = markdownEnv;
  return {
    contentRendered,
    deps: importedFiles,
    excerpt,
    frontmatter,
    headers,
    links,
    sfcBlocks,
    title: (_a = frontmatter.title) != null ? _a : title
  };
};
var resolvePageComponentInfo = async ({
  app,
  htmlFilePathRelative,
  key
}) => {
  const componentFilePathRelative = import_upath.default.join(
    "pages",
    `${htmlFilePathRelative}.vue`
  );
  const componentFilePath = app.dir.temp(componentFilePathRelative);
  const componentFileChunkName = key;
  return {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName
  };
};
var resolvePageDataInfo = ({
  app,
  htmlFilePathRelative,
  key
}) => {
  const dataFilePathRelative = import_upath.default.join("pages", `${htmlFilePathRelative}.js`);
  const dataFilePath = app.dir.temp(dataFilePathRelative);
  const dataFileChunkName = key;
  return {
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName
  };
};
var FILENAME_DATE_RE = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?-(.*)$/;
var DIRNAME_DATE_RE = /(\d{4})\/(\d{1,2})(?:\/(\d{1,2}))?(\/|$)/;
var DEFAULT_DATE = "0000-00-00";
var resolvePageDate = ({
  frontmatter,
  filePathRelative
}) => {
  var _a, _b;
  if (frontmatter.date instanceof Date) {
    return formatDateString(
      [
        frontmatter.date.getUTCFullYear(),
        frontmatter.date.getUTCMonth() + 1,
        frontmatter.date.getUTCDate()
      ].join("-"),
      DEFAULT_DATE
    );
  }
  if (isString(frontmatter.date)) {
    return formatDateString(frontmatter.date, DEFAULT_DATE);
  }
  if (filePathRelative === null) {
    return DEFAULT_DATE;
  }
  const filename = import_upath.default.parse(filePathRelative).name;
  if (filename) {
    const matches = filename.match(FILENAME_DATE_RE);
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${(_a = matches[3]) != null ? _a : "01"}`,
        DEFAULT_DATE
      );
    }
  }
  const dirname = import_upath.default.dirname(filePathRelative);
  if (dirname !== ".") {
    const matches = dirname.match(DIRNAME_DATE_RE);
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${(_b = matches[3]) != null ? _b : "01"}`,
        DEFAULT_DATE
      );
    }
  }
  return DEFAULT_DATE;
};
var log = (0, import_debug.default)("vuepress:core/page");
var resolvePageFileContent = async ({
  filePath,
  options: options2
}) => {
  var _a;
  if (filePath) {
    try {
      const content = await import_fs_extra.default.readFile(filePath, "utf-8");
      return content;
    } catch (e2) {
      log(e2 instanceof Error ? e2.message : e2);
    }
  }
  return (_a = options2.content) != null ? _a : "";
};
var resolvePageFilePath = ({
  app,
  options: options2
}) => {
  if (!options2.filePath) {
    return {
      filePath: null,
      filePathRelative: null
    };
  }
  if (!import_upath.default.isAbsolute(options2.filePath)) {
    throw logger.createError(
      `filePath is not absolute file path: ${options2.filePath}}`
    );
  }
  return {
    filePath: options2.filePath,
    filePathRelative: import_upath.default.relative(app.dir.source(), options2.filePath)
  };
};
var resolvePageHtmlInfo = ({
  app,
  path: pagePath
}) => {
  const htmlFilePathRelative = removeLeadingSlash(
    decodeURI(pagePath.replace(/\/$/, "/index.html"))
  );
  const htmlFilePath = app.dir.dest(htmlFilePathRelative);
  return {
    htmlFilePath,
    htmlFilePathRelative
  };
};
var resolvePageKey = ({ path: path9 }) => `v-${(0, import_hash_sum.default)(path9)}`;
var resolvePageLang = ({
  app,
  frontmatter,
  pathLocale
}) => {
  var _a, _b;
  if (isString(frontmatter.lang) && frontmatter.lang) {
    return frontmatter.lang;
  }
  return (_b = (_a = app.siteData.locales[pathLocale]) == null ? void 0 : _a.lang) != null ? _b : app.siteData.lang;
};
var resolvePagePath = ({
  permalink,
  pathInferred,
  options: options2
}) => {
  let pagePath = options2.path || permalink || pathInferred;
  if (!pagePath) {
    throw logger.createError(
      `page path is empty, page options: ${JSON.stringify(options2, null, 2)}`
    );
  }
  if (!pagePath.endsWith(".html")) {
    pagePath = ensureEndingSlash(pagePath);
  }
  return encodeURI(pagePath);
};
var resolvePagePermalink = ({
  app,
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale
}) => {
  var _a;
  if (isString(frontmatter.permalink)) {
    return frontmatter.permalink;
  }
  const permalinkPattern = getPermalinkPattern({ app, frontmatter });
  if (permalinkPattern === null) {
    return null;
  }
  const [year, month, day] = date.split("-");
  const link = import_upath.default.join(
    pathLocale,
    permalinkPattern.replace(/:year/, year).replace(/:month/, month).replace(/:day/, day).replace(/:slug/, slug).replace(/:raw/, (_a = pathInferred == null ? void 0 : pathInferred.replace(/^\//, "")) != null ? _a : "")
  );
  return ensureLeadingSlash(link);
};
var getPermalinkPattern = ({
  app,
  frontmatter
}) => {
  if (frontmatter.permalinkPattern === null) {
    return null;
  }
  if (isString(frontmatter.permalinkPattern)) {
    return frontmatter.permalinkPattern;
  }
  return app.options.permalinkPattern;
};
var resolvePageRouteMeta = ({
  frontmatter
}) => {
  var _a;
  return (_a = frontmatter.routeMeta) != null ? _a : {};
};
var DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/;
var resolvePageSlug = ({
  filePathRelative
}) => {
  if (!filePathRelative) {
    return "";
  }
  const filename = import_upath.default.parse(filePathRelative).name;
  const match = filename.match(DATE_RE);
  return match ? match[3] : filename;
};
var createPage = async (app, options2) => {
  await app.pluginApi.hooks.extendsPageOptions.process(options2, app);
  const { filePath, filePathRelative } = resolvePageFilePath({
    app,
    options: options2
  });
  const content = await resolvePageFileContent({ filePath, options: options2 });
  const {
    contentRendered,
    deps,
    excerpt,
    frontmatter,
    headers,
    links,
    sfcBlocks,
    title
  } = await renderPageContent({
    app,
    content,
    filePath,
    filePathRelative,
    options: options2
  });
  const routeMeta = resolvePageRouteMeta({ frontmatter });
  const slug = resolvePageSlug({ filePathRelative });
  const date = resolvePageDate({ frontmatter, filePathRelative });
  const { pathInferred, pathLocale } = inferPagePath({ app, filePathRelative });
  const lang = resolvePageLang({ app, frontmatter, pathLocale });
  const permalink = resolvePagePermalink({
    app,
    frontmatter,
    slug,
    date,
    pathInferred,
    pathLocale
  });
  const path9 = resolvePagePath({ permalink, pathInferred, options: options2 });
  const key = resolvePageKey({ path: path9 });
  const { htmlFilePath, htmlFilePathRelative } = resolvePageHtmlInfo({
    app,
    path: path9
  });
  const {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName
  } = await resolvePageComponentInfo({
    app,
    htmlFilePathRelative,
    key
  });
  const { dataFilePath, dataFilePathRelative, dataFileChunkName } = resolvePageDataInfo({ app, htmlFilePathRelative, key });
  const page = {
    data: {
      key,
      path: path9,
      title,
      lang,
      frontmatter,
      excerpt,
      headers
    },
    key,
    path: path9,
    title,
    lang,
    frontmatter,
    excerpt,
    headers,
    content,
    contentRendered,
    date,
    deps,
    links,
    pathInferred,
    pathLocale,
    permalink,
    routeMeta,
    sfcBlocks,
    slug,
    filePath,
    filePathRelative,
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName,
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
    htmlFilePath,
    htmlFilePathRelative
  };
  await app.pluginApi.hooks.extendsPage.process(page, app);
  return page;
};
var log2 = (0, import_debug.default)("vuepress:core/app");
var resolveAppPages = async (app) => {
  log2("resolveAppPages start");
  const pageFilePaths = await globby(app.options.pagePatterns, {
    absolute: true,
    cwd: app.dir.source()
  });
  const pages = await Promise.all(
    pageFilePaths.map((filePath) => createPage(app, { filePath }))
  );
  if (!pages.some((page) => page.path === "/404.html")) {
    pages.push(
      await createPage(app, {
        path: "/404.html",
        frontmatter: {
          layout: "NotFound"
        }
      })
    );
  }
  log2("resolveAppPages finish");
  return pages;
};
var log3 = (0, import_debug.default)("vuepress:core/app");
var appInit = async (app) => {
  log3("init start");
  app.pluginApi.registerHooks();
  app.markdown = await resolveAppMarkdown(app);
  app.pages = await resolveAppPages(app);
  await app.pluginApi.hooks.onInitialized.process(app);
  log3("init finish");
};
var log4 = (0, import_debug.default)("vuepress:core/app");
var appPrepare = async (app) => {
  log4("prepare start");
  for (const page of app.pages) {
    await preparePageComponent(app, page);
  }
  await preparePagesComponents(app);
  for (const page of app.pages) {
    await preparePageData(app, page);
  }
  await preparePagesData(app);
  await preparePagesRoutes(app);
  await prepareSiteData(app);
  await prepareClientConfigs(app);
  await app.pluginApi.hooks.onPrepared.process(app);
  log4("prepare finish");
};
var resolvePluginObject = (app, plugin) => isFunction(plugin) ? plugin(app) : plugin;
var log5 = (0, import_debug.default)("vuepress:core/app");
var appUse = (app, rawPlugin) => {
  const pluginObject = resolvePluginObject(app, rawPlugin);
  if (!pluginObject.name) {
    warn(`an anonymous plugin or theme was detected and ignored`);
    return app;
  }
  log5(`use plugin ${source_default.magenta(pluginObject.name)}`);
  if (pluginObject.multiple !== true) {
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === pluginObject.name
    );
    if (duplicateIndex !== -1) {
      app.pluginApi.plugins.splice(duplicateIndex, 1);
      warn(
        `plugin ${source_default.magenta(
          pluginObject.name
        )} has been used multiple times, only the last one will take effect`
      );
    }
  }
  app.pluginApi.plugins.push(pluginObject);
  return app;
};
var log6 = (0, import_debug.default)("vuepress:core/plugin-api");
var createHookQueue = (name) => {
  const items = [];
  const hookQueue = {
    name,
    items,
    add: (item) => {
      items.push(item);
    },
    process: async (...args) => {
      const results = [];
      for (const item of items) {
        log6(
          `process ${source_default.magenta(name)} from ${source_default.magenta(
            item.pluginName
          )}`
        );
        try {
          const result = await item.hook(...args);
          if (result !== void 0) {
            results.push(result);
          }
        } catch (e2) {
          logger.error(
            `error in hook ${source_default.magenta(name)} from ${source_default.magenta(
              item.pluginName
            )}`
          );
          throw e2;
        }
      }
      return results;
    }
  };
  return hookQueue;
};
var createPluginApiHooks = () => ({
  onInitialized: createHookQueue("onInitialized"),
  onPrepared: createHookQueue("onPrepared"),
  onWatched: createHookQueue("onWatched"),
  onGenerated: createHookQueue("onGenerated"),
  extendsMarkdownOptions: createHookQueue("extendsMarkdownOptions"),
  extendsMarkdown: createHookQueue("extendsMarkdown"),
  extendsPageOptions: createHookQueue("extendsPageOptions"),
  extendsPage: createHookQueue("extendsPage"),
  extendsBundlerOptions: createHookQueue("extendsBundlerOptions"),
  clientConfigFile: createHookQueue("clientConfigFile"),
  alias: createHookQueue("alias"),
  define: createHookQueue("define")
});
var normalizeAliasDefineHook = (hook) => async (app, isServer) => isFunction(hook) ? hook(app, isServer) : hook;
var normalizeClientConfigFileHook = (hook) => async (app) => {
  const clientConfigFileResult = isFunction(hook) ? await hook(app) : hook;
  const isExisted = await import_fs_extra.default.pathExists(clientConfigFileResult);
  if (!isExisted) {
    throw logger.createError(
      `client config file does not exist: ${clientConfigFileResult}`
    );
  }
  return clientConfigFileResult;
};
var createPluginApiRegisterHooks = (plugins, hooks) => () => {
  plugins.forEach(
    ({
      name: pluginName,
      alias,
      define,
      clientConfigFile,
      ...commonHooks
    }) => {
      if (alias) {
        hooks.alias.add({
          pluginName,
          hook: normalizeAliasDefineHook(alias)
        });
      }
      if (define) {
        hooks.define.add({
          pluginName,
          hook: normalizeAliasDefineHook(define)
        });
      }
      if (clientConfigFile) {
        hooks.clientConfigFile.add({
          pluginName,
          hook: normalizeClientConfigFileHook(clientConfigFile)
        });
      }
      Object.entries(commonHooks).forEach(([key, hook]) => {
        if (hooks[key] && hook) {
          hooks[key].add({
            pluginName,
            hook
          });
        }
      });
    }
  );
};
var createPluginApi = () => {
  const plugins = [];
  const hooks = createPluginApiHooks();
  const registerHooks = createPluginApiRegisterHooks(plugins, hooks);
  return {
    plugins,
    hooks,
    registerHooks
  };
};
var require2 = (0, import_module.createRequire)(import.meta.url);
var createAppDirFunction = (baseDir) => {
  return (...args) => import_upath.default.resolve(baseDir, ...args);
};
var resolveAppDir = (options2) => {
  const cache = createAppDirFunction(options2.cache);
  const temp = createAppDirFunction(options2.temp);
  const source = createAppDirFunction(options2.source);
  const dest = createAppDirFunction(options2.dest);
  const publicDir = createAppDirFunction(options2.public);
  const client = createAppDirFunction(
    import_upath.default.resolve(require2.resolve("@vuepress/client/package.json"), "..")
  );
  return {
    cache,
    temp,
    source,
    dest,
    client,
    public: publicDir
  };
};
var resolveAppEnv = (options2, isBuild) => ({
  isBuild,
  isDev: !isBuild,
  isDebug: options2.debug
});
var require3 = (0, import_module2.createRequire)(import.meta.url);
var resolveAppOptions = ({
  base = "/",
  lang = "en-US",
  title = "",
  description = "",
  head = [],
  locales = {},
  source,
  dest = import_upath.default.resolve(source, ".vuepress/dist"),
  temp = import_upath.default.resolve(source, ".vuepress/.temp"),
  cache = import_upath.default.resolve(source, ".vuepress/.cache"),
  public: publicDir = import_upath.default.resolve(source, ".vuepress/public"),
  host = "0.0.0.0",
  port = 8080,
  open = false,
  templateDev = import_upath.default.normalize(
    require3.resolve("@vuepress/client/templates/dev.html")
  ),
  shouldPreload = true,
  shouldPrefetch = true,
  templateBuild = import_upath.default.normalize(
    require3.resolve("@vuepress/client/templates/build.html")
  ),
  bundler,
  debug: debug7 = false,
  markdown = {},
  pagePatterns = ["**/*.md", "!.vuepress", "!node_modules"],
  permalinkPattern = null,
  plugins = [],
  theme
}) => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  source,
  dest,
  temp,
  cache,
  public: publicDir,
  host,
  port,
  open,
  templateDev,
  shouldPreload,
  shouldPrefetch,
  templateBuild,
  bundler,
  debug: debug7,
  markdown,
  pagePatterns,
  permalinkPattern,
  plugins,
  theme
});
var resolveAppSiteData = (options2) => ({
  base: options2.base,
  lang: options2.lang,
  title: options2.title,
  description: options2.description,
  head: options2.head,
  locales: options2.locales
});
var require4 = (0, import_module3.createRequire)(import.meta.url);
var resolveAppVersion = () => {
  const pkgJson = import_fs_extra.default.readJsonSync(
    require4.resolve("@vuepress/core/package.json")
  );
  return pkgJson.version;
};
var resolveAppWriteTemp = (dir) => {
  const tempCache = /* @__PURE__ */ new Map();
  const writeTemp = async (file, content) => {
    const filePath = dir.temp(file);
    const contentCached = tempCache.get(filePath);
    if (contentCached !== content) {
      await import_fs_extra.default.outputFile(filePath, content);
      tempCache.set(filePath, content);
    }
    return filePath;
  };
  return writeTemp;
};
var resolveThemeInfo = (app, theme) => {
  var _a, _b, _c;
  const themeObject = resolvePluginObject(app, theme);
  const themeInfo = {
    plugins: [...(_a = themeObject.plugins) != null ? _a : [], themeObject],
    templateBuild: themeObject.templateBuild,
    templateDev: themeObject.templateDev
  };
  if (!themeObject.extends) {
    return themeInfo;
  }
  const parentThemeInfo = resolveThemeInfo(app, themeObject.extends);
  return {
    plugins: [...parentThemeInfo.plugins, ...themeInfo.plugins],
    templateBuild: (_b = themeObject.templateBuild) != null ? _b : parentThemeInfo.templateBuild,
    templateDev: (_c = themeObject.templateDev) != null ? _c : parentThemeInfo.templateDev
  };
};
var setupAppThemeAndPlugins = (app, config) => {
  var _a, _b, _c, _d;
  const themeInfo = resolveThemeInfo(app, app.options.theme);
  app.options.templateDev = (_b = (_a = config.templateDev) != null ? _a : themeInfo.templateDev) != null ? _b : app.options.templateDev;
  app.options.templateBuild = (_d = (_c = config.templateBuild) != null ? _c : themeInfo.templateBuild) != null ? _d : app.options.templateBuild;
  [...themeInfo.plugins, ...app.options.plugins].flat().forEach((plugin) => app.use(plugin));
};
var createBaseApp = (config, isBuild = false) => {
  const options2 = resolveAppOptions(config);
  const dir = resolveAppDir(options2);
  const env = resolveAppEnv(options2, isBuild);
  const pluginApi = createPluginApi();
  const siteData = resolveAppSiteData(options2);
  const version = resolveAppVersion();
  const writeTemp = resolveAppWriteTemp(dir);
  const app = {
    options: options2,
    siteData,
    version,
    dir,
    env,
    pluginApi,
    writeTemp,
    use: (plugin) => appUse(app, plugin),
    init: () => appInit(app),
    prepare: () => appPrepare(app)
  };
  setupAppThemeAndPlugins(app, config);
  return app;
};
var createBuildApp = (config) => {
  const app = createBaseApp(config, true);
  app.build = () => app.options.bundler.build(app);
  return app;
};
var createDevApp = (config) => {
  const app = createBaseApp(config, false);
  app.dev = () => app.options.bundler.dev(app);
  return app;
};
export {
  appInit,
  appPrepare,
  appUse,
  createAppDirFunction,
  createBaseApp,
  createBuildApp,
  createDevApp,
  createHookQueue,
  createPage,
  createPluginApi,
  createPluginApiHooks,
  createPluginApiRegisterHooks,
  inferPagePath,
  normalizeAliasDefineHook,
  normalizeClientConfigFileHook,
  prepareClientConfigs,
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
  prepareSiteData,
  renderPageContent,
  resolveAppDir,
  resolveAppEnv,
  resolveAppOptions,
  resolveAppPages,
  resolveAppSiteData,
  resolveAppVersion,
  resolveAppWriteTemp,
  resolvePageComponentInfo,
  resolvePageDataInfo,
  resolvePageDate,
  resolvePageFileContent,
  resolvePageFilePath,
  resolvePageHtmlInfo,
  resolvePageKey,
  resolvePageLang,
  resolvePagePath,
  resolvePagePermalink,
  resolvePageRouteMeta,
  resolvePageSlug,
  resolvePluginObject,
  resolveThemeInfo
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
//# sourceMappingURL=@vuepress_core.js.map
